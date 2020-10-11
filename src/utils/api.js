import axios from 'axios';
// import store from '../store';

// dev -> http://localhost:5000/api
// production -> https://api-donowall.herokuapp.com/api
const BASE_URL = "https://api-donowall.herokuapp.com/api";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.response.use(
    res => res,
    err => {
      if (err.response.status === 401) {
        // store.dispatch({ type: LOGOUT });
        console.log('logout');
      }
      return Promise.reject(err);
    }
);
  
export default api;
