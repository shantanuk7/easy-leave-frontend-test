import axios from 'axios';
import Cookie from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const csrfToken = Cookie.get('XSRF-TOKEN');
  
  console.log('AXIOS INSTANCE: document.cookie:', document.cookie);
  console.log('AXIOS INSTANCE: XSRF-TOKEN from js-cookie:', csrfToken);

  if (csrfToken) {
    config.headers['X-XSRF-TOKEN'] = csrfToken;
  }
  return config;
});

export default axiosInstance;
