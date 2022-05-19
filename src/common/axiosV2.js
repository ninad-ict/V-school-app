import axios from 'axios';
import store from './../redux/store';
import { SEPARATE_URL } from './constants';

const httpV2 = axios.create({
  baseURL: SEPARATE_URL,
});

httpV2.interceptors.request.use(
  (config) => {
    const user = store.getState().auth.user;
    if (user && user.hasOwnProperty('token')) {
      const token = user.token;
      config.headers.Authorization = token;
    }
    console.log("%c HTTP REQUEST", "color: green");
    console.log(config)
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default httpV2;