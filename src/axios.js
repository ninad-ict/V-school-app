import axios from "axios";
// import APP_URL from './common/constants';

// - API Link for DEV server
// const APP_URL = 'http://dev.vschoolindia.com/vopa/api/';
// const SEPARATE_URL = 'http://dev.vschoolindia.com/content/api/';

// - API Link for PROD BUILD
const APP_URL = 'https://vschoolindia.com/vopa/api/'; 
const SEPARATE_URL = 'https://vschoolindia.com/content/api/';

// - API Link for Local server
// const APP_URL = 'https://lessons.vopa.in/vopa/api/';


// const config = {
//     headers: {
//       Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'X-Requested-With': 'XMLHttpRequest'
//     }
//   };

//   headers: new Headers({
//     'content-type': 'application/json',
//     'X-Requested-With': 'XMLHttpRequest',
//   }),

const http = axios.create({
    baseURL: APP_URL,
  });
  
export const httpV2 = axios.create({
    baseURL: SEPARATE_URL,
  });


 




export default http;
