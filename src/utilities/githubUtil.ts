import axios from 'axios';

const apiClient = axios.create({
baseURL: import.meta.env.VITE_GITHUB_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Interceptor to attach the Bearer token to every request
apiClient.interceptors.request.use(
    (config) => {
      const token = import.meta.env.VITE_GITHUB_TOKEN
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
