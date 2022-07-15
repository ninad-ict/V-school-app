import http,{httpV2} from "./axios";
// import react,{ useContext } from "react";
// import { UserContext } from './context/UserContext';



const config = {
    headers: {
      'content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization':localStorage.getItem('token')||''
    }
  };

  // if(localStorage.getItem("token"))
  // {
  //   config.headers.Authorization=localStorage.getItem("token");
  //   console.log("config added"+config);
  // }
  
console.log(config);

// const pageHeading=useContext(UserContext);

export function sendWebTimeSpend(time)
{
  console.log("Sending time spent");
  http.post(`web_time_spend`,{
    time_spend:time
  },config).then((result)=>{
    if(result.success)
    {
     return result.data; 
    }

  });
}


export function startAuth(mobile,isEmail,emailId)
{
    console.log("Entered startAuth");
    http
    .post(`mobileSignupLogin/`, {
      mobile: mobile,
      user_type: 'STUDENT',
      otp_on_email : isEmail,
      email : emailId
    },config)
    .then((result) => {
      result = result.data;
      if (result.status == 200) {
        console.log('LOGIN', result.response);  
        localStorage.setItem("token","");     
      } else {
      }
    })
    .catch((err) => {
      console.log(err.message);
      console.log(err);
    //   dispatch(authFailed(err.message));
    });
}



export function verifyOTP(mobile,otp){
    // return (dispatch) => {
    //   dispatch(authStarted());
    console.log("Reached verifyOTP");
     return http
        .post(`studentotpverification/`, {
          mobile: mobile,
          otp: otp,
        },config)
        .then((result) => {
          console.log(result);
          result = result.data;
          if (result.status === 200) {

            console.log("200 Status achieved");
            console.log(result);
            localStorage.setItem("token",result.response.token);
            console.log("token is ->"+result.response.token);

            config.headers.Authorization=result.response.token;
          //   getStudentList().then(d=>{
          //    return d
          //  });   
          
          return (getStudentList());

            //return result.response.token;

           

            // getStudentList();
            // dispatch(
            //   authSuccess({
            //     ...store.getState().auth.user,
            //     ...result.response,
            //     //theme: {name: 'Purple'},
            //   }),
            // );
          } else {
            // dispatch(authFailed(result.message));
            console.log("maybe something went wrong");
            return "FAIL";
          }
        })
        .catch((err) => {
        //   dispatch(authFailed('Something went wrong'));
          console.log('Verification OTP failed');
          console.log(err);
        });
    // };
  };


  export function getStudentList(){
    // return async (dispatch) => {
    //   const appStudents = await getStudentsFromStore();
    //   if (appStudents.length > 0) {
    //     dispatch(getStudentsStarted());
    //     dispatch(getStudentsSuccess(appStudents));
    //     return;
    //   }
      // dispatch(getStudentsStarted());
    return  http
        .get(`getAllStudentProfile/`,config)
        .then((result) => {
          result = result.data;
          console.log('getStudentList', result);
          if (result && result.status === 200) {
            if (!result.response.parentProfileStatus) {

              console.log("Entered parentProfileStatus"+result);
              // pageHeading.changeLogin(true);
              // dispatch(getStudentsFailed('Please create account first'));
              // dispatchNav(
              //   CommonActions.reset({
              //     index: 0,
              //     routes: [{name: 'CreateAccount'}],
              //   }),
              // );
            } else {
              console.log("Entered else part"+result.response.studentProfileDetails);

              localStorage.setItem("students",JSON.stringify(result.response.studentProfileDetails));

              return "SUCCESS";

              // AsyncStorage.setItem(
              //   'students',
              //   JSON.stringify(result.response.studentProfileDetails),
              // );
              // dispatch(getStudentsSuccess(result.response.studentProfileDetails));
            }
          } else {
            console.log("Status is not 200"+result.status);

            // dispatch(getStudentsFailed(result.message));
          }
        })
        .catch((error) => {

          console.log("Some error"+error);

          // NetInfo.fetch().then((info) => {
          //   const {isConnected} = info;
          //   if (!isConnected) {
          //     AsyncStorage.getItem('students').then((students) => {
          //       dispatch(getStudentsSuccess(JSON.parse(students)));
          //     });
          //   } else {
          //     dispatch(getStudentsFailed(error.message));
          //   }
          // });
        });
    // };
  };



  export function getStudentSubjects(params)
  {

    console.log(config.headers.Authorization);

    return http
    .post(`getAllSubjectByClassMed/`, params,config)
    .then((result) => {
      result = result.data;
      if (result && result.status == 200) {

        console.log("200 result for subject->"+result);

        return result;
        // const chapterContents = syncChapterContents(
        //   param.class_id,
        //   result.response,
        //   // store.getState().user.study,
        // );
        // dispatch(setChapterContent(chapterContents));
        // syncWithLocalStorage(param.class_id, result.response);
        // dispatch(getStudentSubjectsSuccess(result.response));
      } else {
        console.log("Something is wrong");
        // dispatch(getStudentSubjectsFailed('Something is went wrong'));
      }
    }).catch(e=>console.log("Error:"+e))

  }




  export const getChapters = (param) => {
    // return (dispatch) => {
      // dispatch(getChaptersStarted());
      // const chaptersFromStore = getChaptersFromStore(
      //   param.class_id,
      //   param.subject_id,
      //   store.getState().user.study,
      // );
      // if ((chaptersFromStore.length > 0 && !param.forceRefresh) || false) {
      //   dispatch(getChaptersSuccess(chaptersFromStore));
      //   return;
      // }
      return http
        .post(`getAllChapters/`, param,config)
        .then((result) => {
          result = result.data;
          if (result && result.status == 200) {

            console.log("Entered 200 for chapters");

            return result;
            // const chapterContent = syncChaptersWithStore(
            //   param,
            //   result.response,
            //   store.getState().user.study,
            // );
            // dispatch(setChapterContent(chapterContent));
            // addChapterToLocalStorage(param, result.response);
            // dispatch(getChaptersSuccess(result.response));
          } else {
            // dispatch(getChaptersFailed('Something is went wrong'));
          }
        })
        .catch((err) => {
          console.log('Error occured chapters get', err);
  
          // NetInfo.fetch().then((info) => {
          //   const {isConnected} = info;
          //   if (!isConnected) {
          //     AsyncStorage.getItem('study').then((study) => {
          //       study = JSON.parse(study);
          //       const classIndex = study.findIndex(
          //         (study) => study.class_id == param.class_id,
          //       );
          //       if (classIndex > -1) {
          //         const subjectIndex = study[classIndex].subjects.findIndex(
          //           (sub) => sub.subject_id == param.subject_id,
          //         );
          //         const chapters =
          //           study[classIndex].subjects[subjectIndex].chapters || [];
          //         dispatch(getChaptersSuccess(chapters));
          //       }
          //     });
          //   } else {
          //     dispatch(getChaptersFailed(err.message));
          //   }
          // });
        });
    // };
  };


  export const getChapterPreview = (param) => {
    // return (dispatch) => {
      // dispatch(chapterPreviewStarted());
    return  http
        .post(`chapterPreview/`, param,config)
        .then((result) => {
          result = result.data;
          if (result && result.status === 200) {

            console.log("The result is 200");
            console.log(result);

            return result;
            // dispatch(
            //   chapterPreviewSuccess({
            //     ...result.response,
            //     chapter_parts: [...result.response.chapter_parts, {}],
            //   }),
            // );
  
            // const contentChapters = addContentToChapterStudy(
            //   {
            //     ...result.response,
            //     chapter_parts: [...result.response.chapter_parts, {}],
            //   },
            //   store.getState().user.study,
            // );
  
            // dispatch(setChapterContent(contentChapters));
          } else {
            // dispatch(chapterPreviewFailed('Something went wrong'));
          }
        })
        .catch((err) => {
          // dispatch(chapterPreviewFailed(err.message));
        });
    // };
  };

  const getContentFromUrl = (data) => {
    return fetch(data.content || data, {
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }),
    });
  };


 export const getChapterPartContentNew = (data) => {
    return http.post(`v2/getpartcontent/`, data,config).then(async (result) => {
      if (result && result.data) {

        console.log("Part is ->"+JSON.stringify(result));
        console.log("Part is ->"+JSON.stringify(result.data));
        let { response } = result.data;
        console.log(response);
        const chapterContent = await getContentFromUrl(response);
        const contentTrans = await chapterContent.json();
        response.content = contentTrans;
        result.data.response = response;
      }
      console.log("This part"+result)
      return result;
    });
  };


  export const getMCQForPart = (param)=>{
    return httpV2.
    get(`mcq/${param}/get_part_mcq_tests/`,config)
    .then(async (result) => {

      console.log("Fetched Mcq data");
      console.log(result.data);
      console.log(result.data.data[0].question_url);

      let obj = {};
        let chapterContent;
        let contentTrans;
        if (result.data && result.data.data.length > 0) {
          chapterContent = await getContentFromUrl(result.data.data[0].question_url);
          contentTrans = await chapterContent.json();
          obj = {id: result.data.data, result: JSON.parse(contentTrans)};
          console.log(obj);
          return obj;
        }

    });

  }





