import {combineReducers} from 'redux';

import authReducer from './authReducer';
import generalReducer from './generalReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  general: generalReducer,
});

export default rootReducer;
