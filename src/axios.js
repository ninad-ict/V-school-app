import axios from "axios";
// import APP_URL from './common/constants';
// const APP_URL = 'http://dev.vopa.in/vopa/api/'; 
const APP_URL = 'https://lessons.vopa.in/vopa/api/';


const config = {
    headers: {
      Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
  };

//   headers: new Headers({
//     'content-type': 'application/json',
//     'X-Requested-With': 'XMLHttpRequest',
//   }),

const http = axios.create({
    baseURL: APP_URL,
  });


 




export default http;
