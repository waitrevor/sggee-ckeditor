import axios from 'axios';
import { AccessTokenManager } from '../utilities/auth';



const apiClient = axios.create({
baseURL: import.meta.env.VITE_GITHUB_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Interceptor to attach the Bearer token to every request
apiClient.interceptors.request.use(
    (config) => {
      const accessTokenManager = AccessTokenManager.getInstance();
      const token = accessTokenManager.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error); // Handle request errors
    }
  );

export default apiClient;
