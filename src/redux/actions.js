import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import http from './../common/axios';
import { dispatchNav, navigate } from './../common/RootNavigation';
import store from './../redux/store';
import * as actionTypes from './actionTypes';

export const authStarted = () => {
  return {
    type: actionTypes.AUTH_STARTED,
  };
};

export const authSuccess = (user) => {
  AsyncStorage.setItem('user', JSON.stringify(user));
  AsyncStorage.setItem('isAuthenticated', 'true');
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: user,
  };
};

const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  };
};

export const authFailed = (message) => {
  return {
    type: actionTypes.AUTH_ERROR,
    payload: message,
  };
};

export const logOut = () => {
  return {
    type: actionTypes.LOG_OUT,
  };
};

export const verifyOTP = (param) => {
  return (dispatch) => {
    dispatch(authStarted());
    http
      .post(`studentotpverification/`, {
        mobile: param.mobile,
        otp: param.otp,
      })
      .then((result) => {
        console.log(result);
        result = result.data;
        if (result.status === 200) {
          dispatch(
            authSuccess({
              ...store.getState().auth.user,
              ...result.response,
              //theme: {name: 'Purple'},
            }),
          );
        } else {
          dispatch(authFailed(result.message));
        }
      })
      .catch((err) => {
        dispatch(authFailed('Something went wrong'));
        console.log('Verification OTP failed');
        console.log(err);
      });
  };
};

export const startAuth = (mobile,isEmail,emailId) => {
  return (dispatch) => {
    dispatch(authStarted());
    http
      .post(`mobileSignupLogin/`, {
        mobile: mobile,
        user_type: 'STUDENT',
        otp_on_email : isEmail,
        email : emailId
      })
      .then((result) => {
        result = result.data;
        if (result.status == 200) {
          console.log('LOGIN', result.response);
          dispatch(setUser(result.response));
          navigate('OtpVerification', { mobile: mobile });
        } else {
          dispatch(authFailed('Invalid login'));
        }
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err);
        dispatch(authFailed(err.message));
      });
  };
};

export const createAccountStarted = () => {
  return {
    type: actionTypes.CREATE_ACCOUNT_STARTED,
  };
};

export const createAccountFailed = (error) => {
  return {
    type: actionTypes.CREATE_ACCOUNT_ERROR,
    payload: error,
  };
};

export const createAccountSuccess = () => {
  return {
    type: actionTypes.CREATE_ACCOUNT_SUCCESS,
  };
};

export const createAccountHttp = (param) => {
  return (dispatch, getState) => {
    dispatch(createAccountStarted());
    http
      .post('createparentprofile/', param)
      .then((result) => {
        console.log('Create parent profile', result);
        result = result.data;
        if (result && result.status === 200) {
          console.log('Create parent profile', result);
          dispatch(createAccountSuccess());
          const { students } = getState().user;
          if (students.length === 0) {
            //navigate('ProfileSelection');
            dispatchNav(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'ProfileSelection' }],
              }),
            );
          } else {
            //navigate('Dashboard');
            dispatchNav(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
              }),
            );
          }
        } else {
          dispatch(createAccountFailed('Something has went wrong'));
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('Something went wrong');
        dispatch(createAccountFailed(err.message));
      });
  };
};

export const setStudentSets = (states) => {
  return {
    type: actionTypes.SET_STUDENT_STATES,
    payload: states,
  };
};

export const setStudentDistricts = (districts) => {
  return {
    type: actionTypes.SET_STUDENT_DISTRICT,
    payload: districts,
  };
};

export const setStudentTals = (tals) => {
  return {
    type: actionTypes.SET_STUDENT_TAL,
    payload: tals,
  };
};

export const getStudentStates = () => {
  return (dispatch) => {
    http
      .get('getstudentstates/')
      .then((result) => {
        result = result.data;
        console.log(result);
        if (result && result.status == 200) {
          dispatch(setStudentSets(result.response));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getStudentDistricts = (param) => {
  return (dispatch) => {
    const localDistricts = store.getState().user.StudentDistricts;
    if (localDistricts.length > 0) {
      console.log(' [ Districts loaded from local ]');
      dispatch(setStudentDistricts(localDistricts));
      return;
    }

    http
      .post('getstudentdistrict/', param)
      .then((result) => {
        result = result.data;
        console.log('getStudentDistricts', result);
        if (result && result.status == 200) {
          console.log(' [ Districts loaded from server ]');
          AsyncStorage.setItem('districts', JSON.stringify(result.response));
          dispatch(setStudentDistricts(result.response));
        } else {
          console.log('sending empty data');
          dispatch(setStudentDistricts([]));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getStudentTals = (param) => {
  return (dispatch) => {
    http
      .post('getstudentblock/', param)
      .then((result) => {
        result = result.data;
        console.log(result);
        if (result && result.status == 200) {
          console.log('Tals', result.response);
          dispatch(setStudentTals(result.response));
        } else {
          dispatch(setStudentTals([]));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const getSchoolsStarted = () => {
  return {
    type: actionTypes.GET_SCHOOL_STARTED,
  };
};

const setStudentSchools = (schools) => {
  return {
    type: actionTypes.SET_SCHOOL,
    payload: schools,
  };
};

export const getStudentSchools = (param) => {
  return (dispatch) => {
    dispatch(getSchoolsStarted());
    http
      .post('getSchoolsStudentApplication/', param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          console.log('Schools', result.response);
          dispatch(setStudentSchools(result.response));
        } else {
          dispatch(setStudentSchools([]));
        }
      })
      .catch((err) => {
        dispatch(setStudentSchools([]));
      });
  };
};

export const setUserExisted = (value) => {
  return {
    type: actionTypes.SET_USER_EXISTED,
    payload: value,
  };
};

export const getBackgroundImage = () =>{
  return (dispatch) => {
    http
      .get('get_app_background/')
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(setAppBackground(result.file));
        } else {
          dispatch(setAppBackground(null));
        }
      })
      .catch((err) => {
        dispatch(setAppBackground(null));
      });
  };
}

export const setAppBackground = (value) => {
  return {
    type: actionTypes.SET_APP_BACKGROUND,
    payload: value,
  };
};

export const setBackgroundImage = () =>{
  return {
    type: actionTypes.IS_SET_BACKGROUND,
    payload: 1,
  };
}

export const getSchoolInfo = (params) =>{
  return (dispatch) => {
    http
      .post('studentsummaryblockwise/',params)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          dispatch(setSchoolInfo(result.response[0]));
        } else {
          dispatch(setSchoolInfo(null));
        }
      })
      .catch((err) => {
        dispatch(setSchoolInfo(null));
      });
  };
}

export const setSchoolInfo = (data) =>{
  return{
    type: actionTypes.SET_SCHOOL_DATA,
    payload: data,
  }
}