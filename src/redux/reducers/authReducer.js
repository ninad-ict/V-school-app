import * as actionTypes from './../actionTypes';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  appVersion : '',
  backgroundImage :null,
  isBackgroundImgSet : false,
  studentSchoolData : null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          ...state.user,
          ...action.payload,
        },
        isLoading: false,
      };
    case actionTypes.LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case actionTypes.SET_USER_EXISTED:
      const user = {...state.user};
      user.is_existed = true;

      console.log('UPDATED USER', user);
      return {
        ...state,
        user: user,
      };
    case actionTypes.SET_APP_BACKGROUND:
      return{
        ...state,
        backgroundImage : action.payload,
      }
    case actionTypes.IS_SET_BACKGROUND:
      return{
        ...state,
        isBackgroundImgSet : action.payload
      }
    case actionTypes.SET_SCHOOL_DATA:
      return{
        ...state,
        studentSchoolData : action.payload
      }
    default:
      return state;
  }
};

export default authReducer;
