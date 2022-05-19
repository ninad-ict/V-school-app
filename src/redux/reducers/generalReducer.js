import * as actionTypes from './../actionTypes';

const initialState = {
  states: [],
  districts: [],
  boards: [],
  mediums: [],
  classes: [],
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_STATES:
      return {
        ...state,
        states: action.payload,
      };
    case actionTypes.SET_BOARDS:
      return {
        ...state,
        boards: action.payload,
      };
    case actionTypes.SET_DISTRICTS:
      return {
        ...state,
        districts: action.payload,
      };
    case actionTypes.SET_MEDIUM:
      return {
        ...state,
        mediums: action.payload,
      };
    case actionTypes.SET_CLASSES:
      return {
        ...state,
        classes: action.payload,
      };
    case actionTypes.SET_APP_VERSION:
      return{
        ...state,
        appVersion : action.payload
      };
    case actionTypes.APP_VERSION_UPDATE_SUCCESS:
      return{
        ...state,
        error : action.payload
      };
    case actionTypes.APP_VERSION_UPDATE_FAILED:
      return{
        ...state,
        error : action.payload
      };
    default:
      return state;
  }
};

export default generalReducer;
