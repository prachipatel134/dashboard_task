
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('jwt');
const apiInstance = axios.create({
  baseURL: 'http://192.168.1.100:8001',
  headers: {
    'Content-Type': 'application/json',
    
  },
  withCredentials: true,
});


apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
   
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("token12",token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default apiInstance;

