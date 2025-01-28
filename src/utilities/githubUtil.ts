import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:80', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});


// Interceptor to attach the Bearer token to every request
apiClient.interceptors.request.use(
    (config) => {
      const token = "eyJhbGciOiJSUzI1NiJ9.eyJncm91cHMiOlsiYWRtaW4iLCJtZW1iZXIiLCJtYWludGVuYW5jZSJdLCJpZCI6IncwMDEiLCJpYXQiOjE3MzY1NjQ1NTUsImlzcyI6InNnZ2VlLm9yZyIsImF1ZCI6Imh0dHBzOi8vc2dnZWUub3JnIiwic3ViIjoiYWNjZXNzIiwiZXhwIjoxMDAwMDAwMDAwMDAwMDAwfQ.AqdChCIupwACiQohi7B0_G85Q3itWMNFb1a9sUOzd7uxzdC8aXHC8WdKdLa3Bb7aln4CKAKQ5D5UyxIeX38qQVOlhRgM8HLs_ynU0JTN6PVQo4hYG3qrwP1CLQyoArzU_fqkw3t7Rag_DUvsW5PXd97kWgi9SHya4B1y4W740wnW8TG3Nuq1yQbvdbN0PsoHxMRLMGrPPK7BhVnYovieZnmpg9zQOT23AABSlWa6rSJGHhDiH8HIPQ_7i4dYliqtOKEVlpWXke5zIGL0P8Ck8RYCpvUnabgNp8ml7JshEauyaPQJphlWL01CIQv-amecoOIf9IVw5o06SoDeERl17ZkbCdcGh7y3KGQ92GvlbWORPMTHzAh5XvdjirUXtK-Z6G0Nf7qnpgAEWo9pRBuj5NN5cZmpx4GO3FUKM1Jnql0vXs4LK83UNH9Y0ggOYgrU4hWzudo8Wcjk7xOHGtJiZystPjWGJDigxQcP8HD9Yls-M6SO7q0xWFgNY5p10zhdOtcqeDNnskAwLgIIH8gZ6B4sgoPq6wNKNKano0_GxDYkTNNzeQUr5SuGlEbNvZp5NeLQM7l2fbO_Q7VXqKh5Q2_kHbJYV_3pB8cKGJUFT8RWhbVlIyDqhlHFPyHgBh1Lmz6J0jj-3JGO3_3XDlDAt3RmpgBynss1EA8V4j9uuqw"
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
