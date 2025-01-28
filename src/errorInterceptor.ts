import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AccessTokenManager } from './utilities/auth';
import { useUserStore } from './utilities/user';

// Function to redirect to specific error pages
export function redirectToErrorPage(errorType: string) {
  const errorDir = '#/errors'; // Base directory for error pages
  const specificErrorTypes = ['404', 'network']; // List of specific error types that have dedicated pages
  const genericError = 'other'; // Generic error page for other error types
  
  if (specificErrorTypes.includes(errorType)) {
    window.location.href = `${errorDir}/${errorType}.html`;
  } else {
    window.location.href = `${errorDir}/${genericError}.html`;
  }
}

// Function to redirect to the login page
export function redirectToLoginPage(redirectUrl?: string) {
  const userStore = useUserStore();
  userStore.clearUsername();
  userStore.setLoginHidden(false);

  const rootDir = '#/';
  const loginPage = 'login';
  const currentPageUrl = window.location.href.split('#')[1];
  const loginPageUrl = `${rootDir}${loginPage}`;

  // Do nothing if already on the login page
  if (currentPageUrl.includes(loginPageUrl.split('#')[1])) {
    return; 
  }

  // Store the current state before redirecting to the login page
  const currentState = {
    path: redirectUrl ? redirectUrl : '#' + currentPageUrl,
    queryParams: window.location.search // Include the current query parameters
  };

  // Redirect to the login page
  window.location.href = `${rootDir}${loginPage}?redirect=${encodeURIComponent(JSON.stringify(currentState))}`;
}

// Define a map to store the number of retries for each request configuration
const retryCounts: Map<string, number> = new Map();

// Function to retry the original request after token refresh
export async function updateRequestConfig(originalRequestConfig: AxiosRequestConfig, maxRetries: number = 3): Promise<AxiosResponse | undefined> {
  const accessTokenManager = AccessTokenManager.getInstance();
  try {
    const accessToken = await accessTokenManager.updateAccessToken();
    if (!accessToken) {
      throw new Error('Unable to update access token.');
    }

    const configKey = JSON.stringify(originalRequestConfig);

    if (retryCounts.has(configKey)) {
      if (retryCounts.get(configKey)! >= maxRetries) {
        console.log('Max retry limit exceeded for request config:', originalRequestConfig);
        return undefined;
      }
      const retryCount = retryCounts.get(configKey)! + 1;
      retryCounts.set(configKey, retryCount);
    } else {
      retryCounts.set(configKey, 1);
    }

    const updatedConfig = {
      ...originalRequestConfig,
      headers: {
        ...originalRequestConfig.headers,
        Authorization: `Bearer ${accessToken}`
      }
    };
    const response = await axios(updatedConfig);
    return response;
  } catch (error: any) {
    console.error(error);
    return undefined;
  }
}

// Response Interceptor
export const errorInterceptor = () => {
  axios.interceptors.response.use(null, async (error) => {
    const { response, config } = error;

    // Ignore errors from login request
    if (config?.url?.includes('auth/login')) {
      console.log('Login ignored in error interceptor.')
      return Promise.reject(error);
    }

    // Ignore errors from refresh request
    if (config?.url?.includes('auth/refresh')) {
      console.log('Refresh ignored in error interceptor.')
      return Promise.reject(error);
    }

    // Network error
    if (!response) {
      console.error('Network Error:', error);
      redirectToErrorPage('network');
      return Promise.reject(error); 
    }

    const { status, data, statusText } = response;

    console.log(`Error interceptor handling ${status} status from location "${config?.url}"`);

    switch (status) {
      case 401: // Unauthorized
      case 403: // Forbidden
        const refreshedConfig = await updateRequestConfig(config);
        if (refreshedConfig) {
          return refreshedConfig; // Retry the original request with the new token
        } else {
          console.error('Token refresh failed or user still unauthorized. Redirecting to login...');
          redirectToLoginPage(config.url);
          return Promise.resolve();
        }

      case 404: // Resource Not Found
        console.error('Resource Not Found!');
        redirectToErrorPage('404');
        return Promise.reject(error);

      default:
        // Other server errors
        const errorMessage = data?.message || statusText;
        console.error('Server Error:', errorMessage);
        redirectToErrorPage(String(status));
        return Promise.reject(error);
    }
  });
};

// Request Interceptor
export const requestInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const accessTokenManager = AccessTokenManager.getInstance();
      const token = accessTokenManager.getAccessToken();

      // Apply Authorization token only for specific routes
      if (config.url?.startsWith('/members/')) {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        // NOTE: else if the token is missing, it will be handled by the response interceptor

        // Specify responseType for specific routes
        if (config.url.endsWith('.pdf')) {
          config.responseType = 'arraybuffer';
        }   
      }
      return config;
    },
    (error) => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );
};
