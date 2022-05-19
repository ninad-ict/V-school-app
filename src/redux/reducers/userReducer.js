import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from './../actionTypes';

const initialState = {
  loading: false,
  error: null,
  StudentStates: [],
  StudentDistricts: [],
  StudentTals: [],
  StudentSchools: [],
  students: [],
  subjects: [],
  chapters: [],
  chapter: {},
  chapter_part: [],
  download_chapter_part: [],
  activeStudent: {},
  timeSpent: {},
  profileUpdated: false,
  profileDeleted: false,
  bookmarks: [],
  bookmarkSuccess: false,
  bookmarkError: null,
  study: [],
  download_chapter_parts: [],
  download_parts_fetched: [],
  downloading: false,
  studentTimeSpent: {},
  downloadProgress: 0,
  comments: [],
  notifications: [],
  dailyActivity: {},
  leaders: [],
  subjectLoading: false,
  chapterLoading: false,
  timeTracking: [],
  pdfGenerationInProgress: false,
  classmates: [],
  accountTime: [],
  accountInfo: {},
  csvStudentData : "",
  allSchoolsData :[],
  stateToppers : [],
  chapterRating : {},
  bookmarkDeleted : false,
  isChapterRated : false,
  chapterRatingErr : null,
  isChapterDownoaded: false,
  isSpecialCourseSelected: false,
  courseNameSelected:'',
  mcqForParts : [],
  mcqAttempt :[],
  mcqSummary : [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ACCOUNT_STARTED:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.CREATE_ACCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case actionTypes.SET_STUDENT_STATES:
      return {
        ...state,
        error: null,
        StudentStates: action.payload,
      };
    case actionTypes.SET_STUDENT_DISTRICT:
      return {
        ...state,
        error: null,
        StudentDistricts: action.payload,
      };
    case actionTypes.SET_STUDENT_TAL:
      return {
        ...state,
        error: null,
        StudentTals: action.payload,
      };
    case actionTypes.GET_SCHOOL_STARTED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SET_SCHOOL:
      return {
        ...state,
        error: null,
        StudentSchools: action.payload,
        loading: false,
      };
    case actionTypes.CREATE_STUDENT_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_STUDENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.CREATE_STUDENT_SUCCESS:
      const updatedStudents = [...state.students];
      updatedStudents.push(action.payload);

      AsyncStorage.setItem('students', JSON.stringify(updatedStudents));

      return {
        ...state,
        loading: false,
        error: null,
        students: updatedStudents,
        activeStudent:
          updatedStudents.length == 1
            ? updatedStudents[0]
            : state.activeStudent,
      };
    case actionTypes.GET_STUDENTS_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_STUDENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        students: action.payload,
      };
    case actionTypes.RESET_STUDENTS:
      return {
        ...state,
        students: [],
      };
    case actionTypes.GET_SUBJECTS_STARTED:
      return {
        ...state,
        subjectLoading: true,
        error: null,
      };
    case actionTypes.GET_SUBJECTS_FAILED:
      return {
        ...state,
        subjectLoading: false,
        error: action.payload,
      };
    case actionTypes.GET_SUBJECTS_SUCCESS:
      return {
        ...state,
        subjectLoading: false,
        error: null,
        subjects: action.payload,
      };
    case actionTypes.GET_CHAPTERS_STARTED:
      return {
        ...state,
        chapterLoading: true,
        error: null,
        chapters: [],
      };
    case actionTypes.GET_CHAPTERS_FAILED:
      return {
        ...state,
        chapterLoading: false,
        error: action.payload,
      };
    case actionTypes.GET_CHAPTERS_SUCCESS:
      return {
        ...state,
        chapterLoading: false,
        error: null,
        chapters: action.payload,
      };
    case actionTypes.CHAPTER_PREVIEW_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CHAPTER_PREVIEW_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.CHAPTER_PREVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        chapter: action.payload,
      };
    case actionTypes.CHAPTER_PART_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        bookmarkError: null,
      };
    case actionTypes.CHAPTER_PART_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        bookmarkError: null,
      };
    case actionTypes.CHAPTER_PART_SUCCESS:
      const param = action.downloadReq
        ? 'download_chapter_part'
        : 'chapter_part';
      return {
        ...state,
        loading: false,
        error: null,
        [param]: action.payload,
        bookmarkError: null,
        leaders: []
      };
    case actionTypes.SET_ACTIVE_STUDENT:
      return {
        ...state,
        activeStudent: action.payload,
        subjects: [],
        chapters: [],
      };
    case actionTypes.GET_CHAPTER_PART_TIME_SPENT_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_CHAPTER_PART_TIME_SPENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_CHAPTER_PART_TIME_SPENT:
      return {
        ...state,
        loading: false,
        error: null,
        timeSpent: action.payload,
      };
    case actionTypes.UPDATE_PROFILE_STARTED:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.UPDATE_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      let activeProfile = {...state.activeStudent};

      const newStudents = [...state.students];
      const updateStudentIndex = newStudents.findIndex(
        (student) => student.student_id == action.payload.student_id,
      );

      if (updateStudentIndex > -1) {
        newStudents[updateStudentIndex] = action.payload;
      }

      if (activeProfile.student_id == action.payload.student_id) {
        activeProfile = action.payload;
      }

      AsyncStorage.setItem('students', JSON.stringify(newStudents));

      return {
        ...state,
        loading: false,
        error: null,
        profileUpdated: true,
        students: newStudents,
        activeStudent: activeProfile,
      };
    case actionTypes.RESET_PROFILE_UPDATE:
      return {
        ...state,
        loading: false,
        profileUpdated: false,
      };
    case actionTypes.DELETE_PROFILE_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.DELETE_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.DELETE_PROFILE_SUCCESS:
      const revisedStudents = state.students.filter((student) => {
        return student.student_id != action.student_id;
      });

      let activeStudent = state.activeStudent;
      if (action.student_id == activeStudent.student_id) {
        activeStudent = revisedStudents.length > 0 ? revisedStudents[0] : {};
      }

      AsyncStorage.setItem('students', JSON.stringify(revisedStudents));

      return {
        ...state,
        loading: false,
        error: null,
        profileDeleted: true,
        students: revisedStudents,
        activeStudent: activeStudent,
      };
    case actionTypes.RESET_DEL_ACTION:
      return {
        ...state,
        profileDeleted: false,
      };
    case actionTypes.GET_BOOKMARK_CHAPTER_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_BOOKMARK_CHAPTER_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actionTypes.GET_BOOKMARK_CHAPTER_SUCCESS:
      return {
        ...state,
        loading: false,
        bookmarks: action.payload,
        error: null,
      };
    case actionTypes.BOOKMARK_CHAPTER_SUCCESS:
      return {
        ...state,
        bookmarkError: null,
        bookmarkSuccess: true,
      };
    case actionTypes.BOOKMARK_CHAPTER_RESET:
      return {
        ...state,
        bookmarkError: null,
        bookmarkSuccess: false,
        bookmarkDeleted: false
      };
    case actionTypes.BOOKMARK_CHAPTER_FAIL:
      return {
        ...state,
        loading: false,
        bookmarkError: action.payload,
      };
    case actionTypes.SYNC_CHAPTERS:
      return {
        ...state,
        study: action.payload,
      };
    case actionTypes.SET_DOWNLOAD_CHAPTERS:
      return {
        ...state,
        download_chapter_parts: action.payload,
      };
    case actionTypes.SET_DOWNLOAD_CHAPTERS_FETCHED:
      let parts = [...state.download_parts_fetched];
      parts = parts.concat(action.payload);
      console.log('SEtting parts fetched');
      return {
        ...state,
        download_parts_fetched: parts,
      };
    case actionTypes.GET_TOTAL_TIME_SPENT:
      const timeSpent = action.payload;
      return {
        ...state,
        studentTimeSpent: timeSpent,
      };
    case actionTypes.SET_DOWNLOAD_STARTED:
      return {
        ...state,
        downloading: true,
      };
    case actionTypes.SET_DOWNLOAD_FINISHED:
      return {
        ...state,
        downloading: false,
        download_chapter_parts: [],
        download_parts_fetched: [],
        downloadProgress: 0,
      };
    case actionTypes.SET_DOWNLOAD_PROGRESS:
      return {
        ...state,
        downloadProgress: action.payload,
      };
    case actionTypes.COMMENT_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.COMMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.COMMENT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case actionTypes.GET_ALL_COMMENTS_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_ALL_COMMENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_ALL_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        comments: action.payload,
      };
    case 'RESET_COMMENTS':
      return {
        ...state,
        comments: [],
      };
    case actionTypes.GET_ALL_NOTIFICATIONS_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_ALL_NOTIFICATIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        notifications: action.payload,
      };
    case actionTypes.GET_DAILY_ACTIVITY_SUCCESS:
      return {
        ...state,
        dailyActivity: action.payload
      }
    case actionTypes.GET_LEADER_BOARD_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.GET_LEADER_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        leaders: action.payload
      }
    case actionTypes.GET_USER_TIME_TRACKING_STARTED:
        return {
          ...state,
          loading: true,
          error: null,
          timeTracking: []
        }
    case actionTypes.GET_USER_TIME_TRACKING_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          timeTracking: action.payload
        }
    case actionTypes.SET_PDF_GEN_STARTED:
        return {
          ...state,
          pdfGenerationInProgress: true,
        }
    case actionTypes.SET_PDF_GEN_FINISHED:
      return {
        ...state,
        pdfGenerationInProgress: false,
      }
    case actionTypes.GET_CLASSMATES_STARTED:
      return {
        ...state,
        loading: true,
        error: null
      }
    case actionTypes.GET_CLASSMATES_SUCCESS:
      return {
        ...state,
        loading: false,
        classmates: action.payload
      }
    case actionTypes.GET_TIME_STARTED:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_TIME_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case actionTypes.GET_TIME_SUCCESS:
      return {
        ...state,
        loading: false,
        accountTime: action.payload
      }

    /****00 */
    case actionTypes.GET_ACCOUNT_INFO_STARTED:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_ACCOUNT_INFO_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case actionTypes.GET_ACCOUNT_INFO_SUCCESS:
      console.log("SETTING INFO", action.payload)
      return {
        ...state,
        loading: false,
        accountInfo: action.payload
      }
    case actionTypes.UPDATE_PROFILE_PICTURE:
      return{
        ...state
      }
    case actionTypes.UPDATE_PROFILE_PICTURE_ERROR:
      return{
        ...state,
        loading: false,
        error: action.payload
      }
    case actionTypes.UPDATE_PROFILE_PICTURE_SUCCESS:
      const updatedStudentsList = [...state.students];
      let activeStudentProfile = {...state.activeStudent};

      const studentIndex = updatedStudentsList.findIndex(
        (student) => student.student_id == action.payload.student_id,
      );

      if (studentIndex > -1) {
        updatedStudentsList[studentIndex].profilepic_url = action.payload.profilepic_url;
      }

      if (activeStudentProfile.student_id == action.payload.student_id) {
        activeStudentProfile = action.payload;
      }

      AsyncStorage.setItem('students', JSON.stringify(updatedStudentsList));

      return{
        ...state,
        loading: false,
        error: null,
        profileUpdated: true,
        students: updatedStudentsList,
        activeStudent: activeStudentProfile,
      }
    case actionTypes.GET_STUDENTS_EXCEL_DATA:
      return{
        ...state,
        loading: false,
        csvStudentData : action.payload
      }
    case actionTypes.SET_ALL_SCHOOLS:
      return{
        ...state,
        loading: false,
        allSchoolsData : action.payload
      }
    case actionTypes.GET_LEADERBOARD_STATE_TOPPERS:
      return{
        ...state,
        stateToppers : action.payload
      }
    case actionTypes.SET_CHAPTER_REVIEW:
      return{
        ...state,
        chapterRating : action.payload
      }
    case actionTypes.CHAPTER_RATING_SUCCESS:
      return{
        ...state,
        chapterRatingErr : null,
        isChapterRated: true
      }
    case actionTypes.CHAPTER_RATING_FAILED:
      return{
        ...state,
        chapterRatingErr : action.payload,
        isChapterRated: false
      }
    case actionTypes.RESET_CHAPTER_RATING:
      return{
        ...state,
        chapterRatingErr : null,
        isChapterRated: false
      }
    case actionTypes.BOOKMARK_DELETE_SUCCESS:
      return{
        ...state,
        bookmarkError: null,
        bookmarkDeleted: true,
      }
    case actionTypes.BOOKMARK_DELETE_FAILED:
      return{
        ...state,
        bookmarkError: action.payload,
        bookmarkDeleted: false,
      }
    case actionTypes.SET_CHAPTER_DOWNLOADED:
      return{
        ...state,
        isChapterDownoaded : true
      }
    case actionTypes.RESET_CHAPTER_DOWNLOADED:
      return{
        ...state,
        isChapterDownoaded : false
      }
    case actionTypes.SET_IS_SPECIAL_COURSE_VIEWED:
      return{
        ...state,
        isSpecialCourseSelected : action.payload
      }
    case actionTypes.SET_COURSE_NAME:
      return{
        ...state,
        courseNameSelected : action.payload
      }
    case actionTypes.SET_MCQ_FORPART:
      return{
        ...state,
        mcqForParts : action.payload
      }
    case actionTypes.GET_MCQ_ATTEMPT:
      return{
          ...state,
          mcqAttempt : action.payload
      }     
    case actionTypes.GET_MCQ_SUMMARY:
      return{
            ...state,
            mcqSummary : action.payload
        }  
    default:
      return state;
  }
};

export default userReducer;
