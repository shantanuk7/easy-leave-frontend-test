import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'user_id': import.meta.env.VITE_TEMP_USER_ID 
  }
});

axiosInstance.interceptors.response.use(
  response => response
);

export default axiosInstance;