import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {CommonActions} from '@react-navigation/native';
import {ToastAndroid} from 'react-native';
import http from './../common/axios';
import httpV2 from '../common/axiosV2';
import {dispatchNav} from './../common/RootNavigation';
import store from './../redux/store';
import * as actionTypes from './actionTypes';
import axios from 'axios';

const createStudentStarted = () => {
  return {
    type: actionTypes.CREATE_STUDENT_STARTED,
  };
};

const createStudentFailed = (error) => {
  return {
    type: actionTypes.CREATE_STUDENT_FAILED,
    payload: error,
  };
};

const createStudentSuccess = (student) => {
  return {
    type: actionTypes.CREATE_STUDENT_SUCCESS,
    payload: student,
  };
};

export const resetStudents = () => {
  return {
    type: actionTypes.RESET_STUDENTS,
  };
};

export const createStudent = (param) => {
  return (dispatch) => {
    dispatch(createStudentStarted());
    http
      .post(`createstudentprofile/`, param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(createStudentSuccess(result.response));
          //navigate('Dashboard');
          dispatchNav(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Dashboard'}],
            }),
          );
        } else {
          dispatch(createStudentFailed(result.message));
        }
      })
      .catch((error) => {
        dispatch(createStudentFailed(error.message));
      });
  };
};

const getStudentsStarted = () => {
  return {
    type: actionTypes.GET_STUDENTS_STARTED,
  };
};

const getStudentsFailed = (error) => {
  return {
    type: actionTypes.GET_STUDENTS_FAILED,
    payload: error,
  };
};

const getStudentsSuccess = (students) => {
  return {
    type: actionTypes.GET_STUDENTS_SUCCESS,
    payload: students,
  };
};

const getStudentsFromStore = async () => {
  let appStudents = await AsyncStorage.getItem('students');
  appStudents = JSON.parse(appStudents);

  if (appStudents && appStudents.length > 0) {
    return appStudents;
  } else {
    return [];
  }
};

export const getStudentList = () => {
  return async (dispatch) => {
    const appStudents = await getStudentsFromStore();
    if (appStudents.length > 0) {
      dispatch(getStudentsStarted());
      dispatch(getStudentsSuccess(appStudents));
      return;
    }
    dispatch(getStudentsStarted());
    http
      .get(`getAllStudentProfile/`)
      .then((result) => {
        result = result.data;
        console.log('getStudentList', result);
        if (result && result.status === 200) {
          if (!result.response.parentProfileStatus) {
            dispatch(getStudentsFailed('Please create account first'));
            dispatchNav(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'CreateAccount'}],
              }),
            );
          } else {
            AsyncStorage.setItem(
              'students',
              JSON.stringify(result.response.studentProfileDetails),
            );
            dispatch(getStudentsSuccess(result.response.studentProfileDetails));
          }
        } else {
          dispatch(getStudentsFailed(result.message));
        }
      })
      .catch((error) => {
        NetInfo.fetch().then((info) => {
          const {isConnected} = info;
          if (!isConnected) {
            AsyncStorage.getItem('students').then((students) => {
              dispatch(getStudentsSuccess(JSON.parse(students)));
            });
          } else {
            dispatch(getStudentsFailed(error.message));
          }
        });
      });
  };
};

const getStudentSubjectsStarted = () => {
  return {
    type: actionTypes.GET_SUBJECTS_STARTED,
  };
};

const getStudentSubjectsFailed = (error) => {
  return {
    type: actionTypes.GET_SUBJECTS_FAILED,
    payload: error,
  };
};

const getStudentSubjectsSuccess = (subjects) => {
  return {
    type: actionTypes.GET_SUBJECTS_SUCCESS,
    payload: subjects,
  };
};

const setChapterContent = (content) => {
  return {
    type: actionTypes.SYNC_CHAPTERS,
    payload: content,
  };
};

export const getStudentSubjects = (param) => {
  return (dispatch) => {
    dispatch(getStudentSubjectsStarted());
    const storedSubjects = subjectsFromStore(
      param,
      store.getState().user.study,
    );
    if (storedSubjects.length > 0 && !param.forceRefresh) {
      dispatch(getStudentSubjectsSuccess(storedSubjects));
      return;
    }
    http
      .post(`getAllSubjectByClassMed/`, param)
      .then((result) => {
        result = result.data;
        if (result && result.status == 200) {
          const chapterContents = syncChapterContents(
            param.class_id,
            result.response,
            store.getState().user.study,
          );
          dispatch(setChapterContent(chapterContents));
          syncWithLocalStorage(param.class_id, result.response);
          dispatch(getStudentSubjectsSuccess(result.response));
        } else {
          dispatch(getStudentSubjectsFailed('Something is went wrong'));
        }
      })
      .catch((error) => {
        NetInfo.fetch().then((info) => {
          const {isConnected} = info;
          if (!isConnected) {
            AsyncStorage.getItem('study').then((study) => {
              study = JSON.parse(study);
              const classIndex = study.findIndex(
                (study) => study.class_id,
                param.class_id,
              );
              if (classIndex > -1) {
                dispatch(getStudentSubjectsSuccess(study[classIndex].subjects));
              }
            });
          } else {
            dispatch(getStudentSubjectsFailed(error.message));
          }
        });
      });
  };
};

const subjectsFromStore = (param, study) => {
  const clsIndex = study.findIndex((study) => study.class_id == param.class_id);
  if (clsIndex > -1) {
    const studentClass = study[clsIndex];
    if (studentClass.subjects.length > 0) {
      const medium_id = studentClass.subjects[0].medium_id;
      if (param.medium_id == medium_id) {
        return studentClass.subjects || [];
      } else {
        return [];
      }
    } else {
      return [];
    }
  } else {
    return [];
  }
};

const syncWithLocalStorage = (class_id, subjects) => {
  AsyncStorage.getItem('study').then((study) => {
    study = JSON.parse(study);
    if (!study) {
      const data = [
        {
          class_id: class_id,
          subjects: subjects,
        },
      ];
      AsyncStorage.setItem('study', JSON.stringify(data));
    } else {
      const existingClassIndex = study.findIndex(
        (study) => study.class_id == class_id,
      );
      if (existingClassIndex > -1) {
        study[existingClassIndex] = {
          class_id: class_id,
          subjects: subjects,
        };
        AsyncStorage.setItem('study', JSON.stringify(study));
      } else {
        study.push({
          class_id: class_id,
          subjects: subjects,
        });
        AsyncStorage.setItem('study', JSON.stringify(study));
      }
    }
  });
};

const syncChapterContents = (class_id, subjects, study) => {
  if (!study) {
    const data = [
      {
        class_id: class_id,
        subjects: subjects,
      },
    ];
    return data;
  } else {
    const existingClassIndex = study.findIndex(
      (study) => study.class_id == class_id,
    );
    if (existingClassIndex > -1) {
      /*study[existingClassIndex] = {
        class_id: class_id,
        subjects: subjects,
      };*/

      return study;
    } else {
      study.push({
        class_id: class_id,
        subjects: subjects,
      });

      return study;
    }
  }
};

const getChaptersStarted = () => {
  return {
    type: actionTypes.GET_CHAPTERS_STARTED,
  };
};

const getChaptersFailed = (error) => {
  return {
    type: actionTypes.GET_CHAPTERS_FAILED,
    payload: error,
  };
};

const getChaptersSuccess = (chapters) => {
  return {
    type: actionTypes.GET_CHAPTERS_SUCCESS,
    payload: chapters,
  };
};

export const getChapters = (param) => {
  return (dispatch) => {
    dispatch(getChaptersStarted());
    const chaptersFromStore = getChaptersFromStore(
      param.class_id,
      param.subject_id,
      store.getState().user.study,
    );
    if ((chaptersFromStore.length > 0 && !param.forceRefresh) || false) {
      dispatch(getChaptersSuccess(chaptersFromStore));
      return;
    }
    http
      .post(`getAllChapters/`, param)
      .then((result) => {
        result = result.data;
        if (result && result.status == 200) {
          const chapterContent = syncChaptersWithStore(
            param,
            result.response,
            store.getState().user.study,
          );
          dispatch(setChapterContent(chapterContent));
          addChapterToLocalStorage(param, result.response);
          dispatch(getChaptersSuccess(result.response));
        } else {
          dispatch(getChaptersFailed('Something is went wrong'));
        }
      })
      .catch((err) => {
        console.log('Error occured chapters get', err);

        NetInfo.fetch().then((info) => {
          const {isConnected} = info;
          if (!isConnected) {
            AsyncStorage.getItem('study').then((study) => {
              study = JSON.parse(study);
              const classIndex = study.findIndex(
                (study) => study.class_id == param.class_id,
              );
              if (classIndex > -1) {
                const subjectIndex = study[classIndex].subjects.findIndex(
                  (sub) => sub.subject_id == param.subject_id,
                );
                const chapters =
                  study[classIndex].subjects[subjectIndex].chapters || [];
                dispatch(getChaptersSuccess(chapters));
              }
            });
          } else {
            dispatch(getChaptersFailed(err.message));
          }
        });
      });
  };
};

const getChaptersFromStore = (class_id, subject_id, study) => {
  const classIndex = study.findIndex((study) => study.class_id == class_id);
  if (classIndex > -1) {
    const studentClass = study[classIndex];
    const subjectIndex = studentClass.subjects.findIndex(
      (subject) => subject.subject_id == subject_id,
    );
    if (subjectIndex > -1) {
      const subject = studentClass.subjects[subjectIndex];
      if (subject.hasOwnProperty('chapters') && subject.chapters.length > 0) {
        return subject.chapters;
      } else {
        return [];
      }
    } else {
      return [];
    }
  } else {
    return [];
  }
};

const addChapterToLocalStorage = (param, chapters) => {
  AsyncStorage.getItem('study').then((study) => {
    study = JSON.parse(study);
    const classIndex = study.findIndex(
      (study) => study.class_id == param.class_id,
    );
    if (classIndex > -1) {
      let cls = study[classIndex];
      const subjectIndex = cls.subjects.findIndex(
        (sub) => sub.subject_id == param.subject_id,
      );
      if (subjectIndex > -1) {
        cls.subjects[subjectIndex].chapters = chapters;
      }
    }
    AsyncStorage.setItem('study', JSON.stringify(study));
  });
};

const syncChaptersWithStore = (param, chapters, study) => {
  const classIndex = study.findIndex(
    (study) => study.class_id == param.class_id,
  );
  if (classIndex > -1) {
    let cls = study[classIndex];
    const subjectIndex = cls.subjects.findIndex(
      (sub) => sub.subject_id == param.subject_id,
    );
    if (subjectIndex > -1) {
      const subject = cls.subjects[subjectIndex];
      if (subject.hasOwnProperty('chapters') && subject.chapters.length > 0) {
        console.log('chapters present');
      } else {
        subject.chapters = chapters;
      }
    }
  }

  return study;
};

const chapterPreviewStarted = () => {
  return {
    type: actionTypes.CHAPTER_PREVIEW_STARTED,
  };
};

const chapterPreviewFailed = (err) => {
  return {
    type: actionTypes.CHAPTER_PREVIEW_FAILED,
    payload: err.payload,
  };
};

export const chapterPreviewSuccess = (chapter) => {
  return {
    type: actionTypes.CHAPTER_PREVIEW_SUCCESS,
    payload: chapter,
  };
};

export const getChapterPreview = (param) => {
  return (dispatch) => {
    dispatch(chapterPreviewStarted());
    http
      .post(`chapterPreview/`, param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(
            chapterPreviewSuccess({
              ...result.response,
              chapter_parts: [...result.response.chapter_parts, {}],
            }),
          );

          const contentChapters = addContentToChapterStudy(
            {
              ...result.response,
              chapter_parts: [...result.response.chapter_parts, {}],
            },
            store.getState().user.study,
          );

          dispatch(setChapterContent(contentChapters));
        } else {
          dispatch(chapterPreviewFailed('Something went wrong'));
        }
      })
      .catch((err) => {
        dispatch(chapterPreviewFailed(err.message));
      });
  };
};

const addContentToChapterStudy = (chapter, study) => {
  const {class_id, subject_id, chapter_id} = chapter.chapter;
  const classIndex = study.findIndex((study) => study.class_id == class_id);
  if (classIndex > -1) {
    const studentClass = study[classIndex];
    const subjectIndex = studentClass.subjects.findIndex(
      (subject) => subject.subject_id == subject_id,
    );
    if (subjectIndex > -1) {
      const subject = studentClass.subjects[subjectIndex];
      const chapterIndex = subject.chapters.findIndex(
        (chapter) => chapter.chapter_id == chapter_id,
      );
      if (chapterIndex > -1) {
        const ch = subject.chapters[chapterIndex];
        if ('parts' in ch) {
          console.log('Already parts present');
        } else {
          ch.parts = chapter.chapter_parts;
        }
      }
    }
  }
  return study;
};

const chapterPartStarted = () => {
  return {
    type: actionTypes.CHAPTER_PART_STARTED,
  };
};

const chapterPartFailed = (err) => {
  return {
    type: actionTypes.CHAPTER_PART_FAILED,
    payload: err.payload,
  };
};

const chapterPartSuccess = (chapter_part, downloadReq) => {
  return {
    type: actionTypes.CHAPTER_PART_SUCCESS,
    payload: chapter_part,
    downloadReq: downloadReq,
  };
};

export const getChapterPart = (param, downloadReq = false) => {
  return (dispatch) => {
    dispatch(chapterPartStarted());
    if (param.part_id == 'summary') {
      dispatch(chapterPartSuccess([{}]));
      return;
    }
    let {study, chapter} = store.getState().user;

    if (chapter && !chapter.hasOwnProperty('chapter_id')) {
      if (param.chapter && param.chapter.hasOwnProperty('chapter_id')) {
        chapter = {
          chapter: param.chapter,
        };
      }
    }
    const existingContent = syncWithChapterContent(
      param.part_id,
      chapter,
      study,
      null,
    );

    if (
      (existingContent && existingContent.length > 0 && !param.forceRefresh) ||
      false
    ) {
      dispatch(chapterPartSuccess(existingContent, downloadReq));
      return;
    }
    /*http
      .post(`v2/getpartcontent/`, param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          const chapter_part = result.response.content;
          let part = [];
          for (let key in chapter_part) {
            part.push({...chapter_part[key], part_id: param.part_id});
          }
          dispatch(chapterPartSuccess(part, downloadReq));
          syncWithChapterContent(param.part_id, chapter, study, part);
        } else {
          dispatch(chapterPartFailed('Something went wrong'));
        }
      })
      .catch((err) => {
        dispatch(chapterPartFailed(err.message));
      });*/

    getChapterPartContentNew(param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          const chapter_part = result.response.content;
          console.log(
            result.response,
            'chapter_part from getChapterPartContentNew',
          );
          let part = [];
          for (let key in chapter_part) {
            part.push({...chapter_part[key], part_id: param.part_id});
          }
          dispatch(chapterPartSuccess(part, downloadReq));
          syncWithChapterContent(param.part_id, chapter, study, part);
        } else {
          dispatch(chapterPartFailed('Something went wrong'));
        }
      })
      .catch((err) => {
        dispatch(chapterPartFailed(err.message));
      });
  };
};

getContentFromUrl = (data) => {
  return fetch(data.content, {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }),
  });
};

getContentFromUrl1 = (data) => {
  console.log(data[0].question_url, 'data');
  return fetch(data[0].question_url, {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }),
  });
};

getChapterPartContentNew = (data) => {
  return http.post(`v2/getpartcontent/`, data).then(async (result) => {
    console.log(result, 'result ---');
    if (result && result.data) {
      let {response} = result.data;
      console.log(response, 'response');
      const chapterContent = await getContentFromUrl(response);
      const contentTrans = await chapterContent.json();
      response.content = contentTrans;
      result.data.response = response;
    }
    return result;
  });
};

const syncWithChapterContent = (part_id, chapter, study, partContent) => {
  const {chapter_id, subject_id, class_id} = chapter.chapter;
  const classIndex = study.findIndex((study) => study.class_id == class_id);
  if (classIndex > -1) {
    const studentClass = study[classIndex];
    const subjectIndex = studentClass.subjects.findIndex(
      (subject) => subject.subject_id == subject_id,
    );
    if (subjectIndex > -1) {
      const subject = studentClass.subjects[subjectIndex];
      const chapterIndex = subject.chapters.findIndex(
        (chapter) => chapter.chapter_id == chapter_id,
      );
      if (chapterIndex > -1) {
        const chapter = subject.chapters[chapterIndex];
        if ('parts' in chapter) {
          const partIndex = chapter.parts.findIndex(
            (part) => part.part_id == part_id,
          );
          if (partIndex > -1) {
            const part = chapter.parts[partIndex];
            if ('content' in part) {
              return part.content;
            } else {
              if (partContent) {
                part.content = partContent;
              }
              return [];
            }
          }
        }
        return [];
      }
    }
  }
};

export const setActiveStudent = (student) => {
  return {
    type: actionTypes.SET_ACTIVE_STUDENT,
    payload: student,
  };
};

const getChapterTimeSpentStarted = () => {
  return {
    type: actionTypes.GET_CHAPTER_PART_TIME_SPENT_STARTED,
  };
};

const getChapterTimeSpentFailed = (err) => {
  return {
    type: actionTypes.GET_CHAPTER_PART_TIME_SPENT_FAILED,
    payload: err,
  };
};

const getChapterTimeSpentSuccess = (data) => {
  return {
    type: actionTypes.GET_CHAPTER_PART_TIME_SPENT,
    payload: data,
  };
};

export const getChapterTimeSpent = (param) => {
  return (dispatch) => {
    dispatch(getChapterTimeSpentStarted());
    http
      .post(`getstudentspendtime/`, param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(getChapterTimeSpentSuccess(result.response));
        } else {
          dispatch(getChapterTimeSpentFailed('Something went wrong'));
        }
      })
      .catch((err) => {
        dispatch(getChapterTimeSpentFailed('Something went wrong'));
        console.log(err);
      });
  };
};

export const setChapterTimeSpent = (param) => {
  return (dispatch) => {
    http
      .post(`studentChapterPartTimeSpend/`, param)
      .then((result) => {
        console.log('studentChapterPartTimeSpend', result);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };
};

export const setChapterTestTimeSpent = (param) => {
  return (dispatch) => {
    http
      .post(`studdentChaperPartExamTimeSpend/`, param)
      .then((result) => {
        console.log('[studdentChaperPartExamTimeSpend]', result);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };
};

const updateProfileStarted = () => {
  return {
    type: actionTypes.UPDATE_PROFILE_STARTED,
  };
};

const updatedProfileFailed = (error) => {
  return {
    type: actionTypes.UPDATE_PROFILE_ERROR,
    payload: error,
  };
};

const updateProfileSuccess = (profile) => {
  return {
    type: actionTypes.UPDATE_PROFILE_SUCCESS,
    payload: profile,
  };
};

export const updateProfile = (params) => {
  return (dispatch) => {
    dispatch(updateProfileStarted());
    http
      .put(`updateStudentProfile/`, params)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(updateProfileSuccess(result.response));
          setTimeout(() => {
            dispatch({
              type: actionTypes.RESET_PROFILE_UPDATE,
            });
          }, 1000);
        } else {
          dispatch(updatedProfileFailed('Something went wrong'));
        }
      })
      .catch((err) => {
        console.log('ERROR ', err);
        dispatch(updatedProfileFailed('Something went wrong'));
      });
  };
};

const updatedProfilePicFailed = (error) => {
  return {
    type: actionTypes.UPDATE_PROFILE_PICTURE_ERROR,
    payload: error,
  };
};

const updateProfilePicSuccess = (profile) => {
  return {
    type: actionTypes.UPDATE_PROFILE_PICTURE_SUCCESS,
    payload: profile,
  };
};

export const updateProfilePicture = (student_id, file) => {
  let formData = new FormData();
  formData.append('student_id', student_id);
  formData.append('filename', file, 'sample.jpg');
  return (dispatch) => {
    http
      .post(`uplaodStudentProfilePic/`, formData)
      .then((result) => {
        console.log(result, 'result before extract data');
        result = result.data;
        if (result && result.status === 200) {
          console.log(result, 'result after extract data');
          dispatch(updateProfilePicSuccess(result.response));
          setTimeout(() => {
            dispatch({
              type: actionTypes.RESET_PROFILE_UPDATE,
            });
          }, 1000);
        } else {
          dispatch(updatedProfilePicFailed('Something went wrong'));
        }
      })
      .catch((err) => {
        console.log('ERROR ', err);
        dispatch(updatedProfilePicFailed('Something went wrong'));
      });
  };
};

const deleteProfileStarted = () => {
  return {
    type: actionTypes.DELETE_PROFILE_STARTED,
  };
};

const deleteProfileFailed = (error) => {
  return {
    type: actionTypes.DELETE_PROFILE_ERROR,
    payload: error,
  };
};

const deleteProfileSuccess = (params) => {
  return {
    type: actionTypes.DELETE_PROFILE_SUCCESS,
    student_id: params.student_id,
  };
};

export const deleteProfile = (params) => {
  return (dispatch) => {
    dispatch(deleteProfileStarted());
    http
      .put(`deleteStudentProfile/`, params)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(deleteProfileSuccess(params));
        } else {
          dispatch(deleteProfileFailed('Something went wrong'));
        }
      })
      .catch((err) => {
        console.log('ERROR ', err);
        dispatch(deleteProfileFailed('Something went wrong'));
      });
  };
};

export const resetProfileDel = () => {
  return {
    type: actionTypes.RESET_DEL_ACTION,
  };
};

export const resetBookmarkChapter = () => {
  return {
    type: actionTypes.BOOKMARK_CHAPTER_RESET,
  };
};

export const bookmarkChapter = (param) => {
  return (dispatch) => {
    http
      .post(`creatStudentBookmark/`, param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          console.log('Bookmark success', result);
          dispatch({
            type: actionTypes.BOOKMARK_CHAPTER_SUCCESS,
          });
        } else {
          ToastAndroid.show(result.message, 1500);
        }
      })
      .catch((err) => {
        console.log('error');
      });
  };
};

const getBookmarkStarted = () => {
  return {
    type: actionTypes.GET_BOOKMARK_CHAPTER_STARTED,
  };
};

const getBookmarkFailed = (error) => {
  return {
    type: actionTypes.GET_BOOKMARK_CHAPTER_FAILED,
    payload: error,
  };
};

const getBookmarkSuccess = (bookmarks) => {
  return {
    type: actionTypes.GET_BOOKMARK_CHAPTER_SUCCESS,
    payload: bookmarks,
  };
};

export const getBookmarks = (param) => {
  return (dispatch) => {
    dispatch(getBookmarkStarted());
    http
      .post(`getStudentBookmarks/`, param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(getBookmarkSuccess(result.response));
        } else {
          dispatch(getBookmarkFailed('Something went wrong'));
        }
      })
      .catch((err) => {
        dispatch(getBookmarkFailed('Something went wrong'));
      });
  };
};

export const deleteBookmarkSuccess = (data) => {
  return {
    type: actionTypes.BOOKMARK_DELETE_SUCCESS,
    payload: data,
  };
};

export const deleteBookmarkFailed = (data) => {
  return {
    type: actionTypes.BOOKMARK_DELETE_FAILED,
    payload: data,
  };
};

export const deleteBookmark = (bookmarkId) => {
  return (dispatch) => {
    http
      .delete(`deletebookmark/${bookmarkId}/`)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(deleteBookmarkSuccess(result.response));
        } else {
          dispatch(deleteBookmarkFailed('Something went wrong'));
        }
      })
      .catch((err) => {
        dispatch(deleteBookmarkFailed('Something went wrong'));
      });
  };
};

export const setDownloadChapters = (chapters) => {
  return {
    type: actionTypes.SET_DOWNLOAD_CHAPTERS,
    payload: chapters,
  };
};

export const setDownloadChapterFetched = (chapters) => {
  return {
    type: actionTypes.SET_DOWNLOAD_CHAPTERS_FETCHED,
    payload: chapters,
  };
};

export const getTotalTimeSpent = (data) => {
  return {
    type: actionTypes.GET_TOTAL_TIME_SPENT,
    payload: data,
  };
};

export const totalTimeSpent = (param) => {
  return (dispatch) => {
    http
      .post(`studenttotaltimespend/`, param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(
            getTotalTimeSpent({
              ...result.response,
              student_id: param.student_id,
            }),
          );
        }
      })
      .catch((err) => {
        console.log('[ TIME SPENT Error ]', err);
        dispatch(
          getTotalTimeSpent({
            total_time_spend: 0,
            time_spend_by_subject: [],
            student_id: param.student_id,
          }),
        );
      });
  };
};

export const setDownloadStarted = () => {
  return {
    type: actionTypes.SET_DOWNLOAD_STARTED,
  };
};

export const setDownloadFinished = () => {
  return {
    type: actionTypes.SET_DOWNLOAD_FINISHED,
  };
};

export const setPDFGenerationStarted = () => {
  return {
    type: actionTypes.SET_PDF_GEN_STARTED,
  };
};

export const setPDFGeneratedFinished = () => {
  return {
    type: actionTypes.SET_PDF_GEN_FINISHED,
  };
};

export const setDownloadProgress = (progress) => {
  return {
    type: actionTypes.SET_DOWNLOAD_PROGRESS,
    payload: progress,
  };
};

const commentStarted = () => {
  return {
    type: actionTypes.COMMENT_STARTED,
  };
};

const commentFailed = (error) => {
  return {
    type: actionTypes.COMMENT_FAILED,
    payload: error,
  };
};

const commentSuccess = () => {
  return {
    type: actionTypes.COMMENT_SUCCESS,
  };
};

export const chapterComment = (param) => {
  return (dispatch) => {
    dispatch(commentStarted());
    http
      .post(`addcomment/`, param)
      .then((result) => {
        result = result.data;
        console.log({result});
        if (result && result.status === 200) {
          dispatch(commentSuccess());
        } else {
          dispatch(commentFailed('Something went wrong'));
        }
      })
      .catch((err) => {
        dispatch(commentFailed(err.message));
      });
  };
};

const getAllCommentsStarted = () => {
  return {
    type: actionTypes.GET_ALL_COMMENTS_STARTED,
  };
};

const getAllCommentsFailed = (error) => {
  return {
    type: actionTypes.GET_ALL_COMMENTS_FAILED,
    payload: error,
  };
};

const getAllCommentsSuccess = (comments) => {
  return {
    type: actionTypes.GET_ALL_COMMENTS_SUCCESS,
    payload: comments,
  };
};

export const getAllComments = (param) => {
  return (dispatch) => {
    dispatch(getAllCommentsStarted());
    console.log('API called');
    http
      .post(`getchaptercomments/`, param)
      .then((result) => {
        result = result.data;
        console.log({comments: result});
        if (result && result.status === 200) {
          dispatch(getAllCommentsSuccess(result.response.chapterDetails));
        } else {
          dispatch(getAllCommentsSuccess([]));
        }
      })
      .catch((err) => {
        dispatch(getAllCommentsFailed(err.message));
      });
  };
};

export const resetComments = () => {
  return {
    type: 'RESET_COMMENTS',
  };
};

const getAllNotificationsStarted = () => {
  return {
    type: actionTypes.GET_ALL_NOTIFICATIONS_STARTED,
  };
};

const getAllNotificationsFailed = (error) => {
  return {
    type: actionTypes.GET_ALL_NOTIFICATIONS_FAILED,
    payload: error,
  };
};

const getAllNotificationsSuccess = (notifications) => {
  return {
    type: actionTypes.GET_ALL_NOTIFICATIONS_SUCCESS,
    payload: notifications,
  };
};

export const getAllNotifications = (param) => {
  return (dispatch) => {
    dispatch(getAllNotificationsStarted());
    http
      .post(`getallnotifications/`, param)
      .then((result) => {
        result = result.data;
        console.log({result});
        if (result && result.status === 200) {
          dispatch(
            getAllNotificationsSuccess(result.response.notificationDetails),
          );
        } else {
          dispatch(getAllNotificationsSuccess([]));
        }
      })
      .catch((err) => {
        console.log({err});
        dispatch(getAllNotificationsSuccess([]));
      });
  };
};

const getDailyActivitySuccess = (data) => {
  return {
    type: actionTypes.GET_DAILY_ACTIVITY_SUCCESS,
    payload: data,
  };
};

export const getDailyActivity = () => {
  return (dispatch) => {
    http
      .get(`getdailyactivity/`)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(getDailyActivitySuccess(result.response));
        } else {
          dispatch(getDailyActivitySuccess({}));
        }
      })
      .catch((err) => {
        console.log({err});
        dispatch(getDailyActivitySuccess({}));
      });
  };
};

const getLeaderBoardStarted = () => {
  return {
    type: actionTypes.GET_LEADER_BOARD_STARTED,
  };
};

const getLeaderBoardSuccess = (data) => {
  return {
    type: actionTypes.GET_LEADER_BOARD_SUCCESS,
    payload: data,
  };
};

export const getLeaderBoard = (param) => {
  return (dispatch) => {
    dispatch(getLeaderBoardStarted());
    http
      .post(`getleaderboard/`, param)
      .then((result) => {
        console.log({param});
        console.log('Leaders FROM API', result);
        result = result.data;
        if (result && result.status === 200) {
          dispatch(getLeaderBoardSuccess(result.response));
        } else {
          dispatch(getLeaderBoardSuccess([]));
        }
      })
      .catch((err) => {
        console.log({err});
        dispatch(getLeaderBoardSuccess([]));
      });
  };
};

const getClassmatesStarted = () => {
  return {
    type: actionTypes.GET_CLASSMATES_STARTED,
  };
};

const getClassmatesSuccess = (data) => {
  return {
    type: actionTypes.GET_CLASSMATES_SUCCESS,
    payload: data,
  };
};

export const getClassmates = (param) => {
  return (dispatch) => {
    dispatch(getClassmatesStarted());
    http
      .post(`studentlist_limited_data/`, param)
      .then((result) => {
        console.log('Classmates FROM API', result);
        result = result.data;
        if (result && result.status === 200) {
          dispatch(getClassmatesSuccess(result.response.chapterDetails));
        } else {
          dispatch(getClassmatesSuccess([]));
        }
      })
      .catch((err) => {
        console.log({err});
        dispatch(getClassmatesSuccess([]));
      });
  };
};

const getTimeTrackingStarted = () => {
  return {
    type: actionTypes.GET_USER_TIME_TRACKING_STARTED,
  };
};

const getTimeTrackingSuccess = (data) => {
  return {
    type: actionTypes.GET_USER_TIME_TRACKING_SUCCESS,
    payload: data,
  };
};

export const getTimeTracking = (param) => {
  return (dispatch) => {
    dispatch(getTimeTrackingStarted());
    http
      .post(`studentusagegraph/`, param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(getTimeTrackingSuccess(result.response.per_day_usage));
        } else {
          dispatch(getTimeTrackingSuccess([]));
        }
      })
      .catch((err) => {
        console.log({err});
        dispatch(getTimeTrackingSuccess([]));
      });
  };
};

export const getAccountTimeStarted = () => {
  return {
    type: actionTypes.GET_TIME_STARTED,
  };
};

export const getAccountTimeSuccess = (data) => {
  return {
    type: actionTypes.GET_TIME_SUCCESS,
    payload: data,
  };
};

export const getAccountTimeFailed = (error) => {
  return {
    type: actionTypes.GET_TIME_FAILED,
    error: error,
  };
};

export const getAccountTime = (param) => {
  return (dispatch) => {
    dispatch(getAccountTimeStarted());
    http
      .post(`student_subject_detail/`, param)
      .then((result) => {
        console.log('Accoutn Time info', result);
        result = result.data;

        dispatch(getAccountTimeSuccess(result.response.subject_wise_data));
      })
      .catch((err) => {
        console.log({err});
        dispatch(getAccountTimeFailed(err.message));
      });
  };
};

/*** */

export const getAccountInfoStarted = () => {
  return {
    type: actionTypes.GET_ACCOUNT_INFO_STARTED,
  };
};

export const getAccountInfoSuccess = (data) => {
  return {
    type: actionTypes.GET_ACCOUNT_INFO_SUCCESS,
    payload: data,
  };
};

export const getAccountInfoFailed = (error) => {
  return {
    type: actionTypes.GET_ACCOUNT_INFO_FAILED,
    error: error,
  };
};

export const getAccountInfo = (param) => {
  return (dispatch) => {
    dispatch(getAccountTimeStarted());
    http
      .post(`getStudentProfile/`, param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(getAccountInfoSuccess(result.response.parent_details));
        }
      })
      .catch((err) => {
        console.log({err});
        dispatch(getAccountInfoFailed(err.message));
      });
  };
};

export const getStudentsExcelData = (data) => {
  return {
    type: actionTypes.GET_STUDENTS_EXCEL_DATA,
    payload: data,
  };
};

export const getStudentsForExcel = (param) => {
  return (dispatch) => {
    http
      .post(`student_limited_list_csv/`, param)
      .then((result) => {
        if (result && result.status === 200) {
          dispatch(
            getStudentsExcelData(JSON.parse(JSON.stringify(result.data))),
          );
        }
      })
      .catch((err) => {
        console.log({err});
      });
  };
};

export const setAllSchools = (schools) => {
  return {
    type: actionTypes.SET_ALL_SCHOOLS,
    payload: schools,
  };
};

export const getAllSchoolsByUdise = (param) => {
  // let url = `getschoollist/?${!param.flag ? `u_dise`:`search`}=${param.udise}&limit=50`;
  return (dispatch) => {
    http
      .get(`getschoollist/?search=${param.udise}&limit=50`)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(setAllSchools(result.response));
        } else {
          dispatch(setAllSchools([]));
        }
      })
      .catch((err) => {
        dispatch(setAllSchools([]));
      });
  };
};

export const getLeaderBoardData = (param) => {
  return (dispatch) => {
    dispatch(getLeaderBoardStarted());
    http
      .post(`getstudenttopperboard/`, param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(getLeaderBoardSuccess(result.response));
        } else {
          dispatch(getLeaderBoardSuccess([]));
        }
      })
      .catch((err) => {
        dispatch(getLeaderBoardSuccess([]));
      });
  };
};

export const getLeaderBoardTopperSuccess = (data) => {
  return {
    type: actionTypes.GET_LEADERBOARD_STATE_TOPPERS,
    payload: data,
  };
};

export const getToppersFromState = (param) => {
  return (dispatch) => {
    http
      .post(`getstudenttopperboard/`, param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(getLeaderBoardTopperSuccess(result.response));
        } else {
          dispatch(getLeaderBoardTopperSuccess([]));
        }
      })
      .catch((err) => {
        dispatch(getLeaderBoardTopperSuccess([]));
      });
  };
};

export const addChapterRating = (param) => {
  return (dispatch) => {
    http
      .post(`chapterrating/`, param)
      .then((result) => {
        result = result.data;
        console.log(result, 'result after addChapterRating');
        if (result && result.status === 200) {
          dispatch(chapterRatingSuccess(result.response));
        } else {
          dispatch(chapterRatingFailed(result.response));
        }
      })
      .catch((err) => {
        dispatch(chapterRatingFailed(err));
      });
  };
};

export const chapterRatingFailed = (data) => {
  return {
    type: actionTypes.CHAPTER_RATING_FAILED,
    payload: data,
  };
};

export const chapterRatingSuccess = (data) => {
  return {
    type: actionTypes.CHAPTER_RATING_SUCCESS,
    payload: data,
  };
};

export const updateChapterRating = (param) => {
  return (dispatch) => {
    http
      .patch(`update_chapterrating/`, param)
      .then((result) => {
        result = result.data;
        console.log(result, 'result after updateChapterRating');
        if (result && result.status === 200) {
          dispatch(chapterRatingSuccess(result.response));
        } else {
          dispatch(chapterRatingFailed(result.response));
        }
      })
      .catch((err) => {
        dispatch(chapterRatingFailed(err));
      });
  };
};

export const getChapterRating = (param) => {
  return (dispatch) => {
    http
      .post(`get_chapter_ratings/`, param)
      .then((result) => {
        result = result.data;
        console.log(result, 'result after getChapterRating');
        if (result && result.status === 200) {
          dispatch(setChapterReview(result.response));
        } else {
          dispatch(setChapterReview(null));
        }
      })
      .catch((err) => {
        dispatch(setChapterReview(null));
      });
  };
};

export const setChapterReview = (data) => {
  return {
    type: actionTypes.SET_CHAPTER_REVIEW,
    payload: data,
  };
};

export const resetChapterRating = () => {
  return {
    type: actionTypes.RESET_CHAPTER_RATING,
  };
};

export const setChapterDownloaded = () => {
  return {
    type: actionTypes.SET_CHAPTER_DOWNLOADED,
  };
};

export const resetChapterDownloaded = () => {
  return {
    type: actionTypes.RESET_CHAPTER_DOWNLOADED,
  };
};

export const setIsSpecialCourseViewed = (value) => {
  return {
    type: actionTypes.SET_IS_SPECIAL_COURSE_VIEWED,
    payload: value,
  };
};

export const setCourseName = (value) => {
  return {
    type: actionTypes.SET_COURSE_NAME,
    payload: value,
  };
};

export const setMCQForpart = (mcq) => {
  return {
    type: actionTypes.SET_MCQ_FORPART,
    payload: mcq,
  };
};

export const getMCQForPart = (param) => {
  console.log('param', param);
  return (dispatch) => {
    httpV2
      .get(`content/api/mcq/${param}/get_part_mcq_tests/`)
      .then(async (result) => {
        console.log(result.data.data, 'result');
        let obj = {};
        let chapterContent ;
        let contentTrans
        if (result.data && result.data.data.length > 0) {
           chapterContent = await getContentFromUrl1(result.data.data);
           contentTrans = await chapterContent.json();
          obj = {id: result.data.data, result: contentTrans};
        }
        console.log(chapterContent, 'response1212', contentTrans, obj);
        dispatch(setMCQForpart(obj));
      });
  };
};

export const setMCQAttempt = (data) => {
  return {
    type: actionTypes.GET_MCQ_ATTEMPT,
    payload: data,
  };
};

export const getMCQAttempt = (param) => {
  console.log(param, 'param');
  return (dispatch) => {
    console.log(param, 'dispatch');
    httpV2
      .post(`content/api/attempts/mcq_attempts/`, param)
      .then((result) => {
        console.log(result, 'result');
        dispatch(setMCQAttempt(result));
      })
      .catch((res) => {
        console.log(res);
      });
  };
};

export const setMCQSummary = (data) => {
  return {
    type: actionTypes.GET_MCQ_SUMMARY,
    payload: data,
  };
};

export const getMCQSummary = (param) => {
  console.log(param, 'param');
  return (dispatch) => {
    console.log(param, 'dispatch');
    httpV2
      .post(`content/api/attempts/get_student_test_summery/`, param)
      .then((result) => {
        console.log(result, 'result');
        dispatch(setMCQSummary(result.data));
      })
      .catch((res) => {
        console.log(res);
      });
  };
};
