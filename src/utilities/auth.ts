import { useUserStore } from './user';

export type AccessToken = string | undefined;

export class AccessTokenManager {
  private static instance: AccessTokenManager;
  private accessToken: AccessToken;
  private subscribers: ((token: AccessToken) => void)[] = [];

  private constructor() {
    // Initialize accessToken here if needed
  }

  public static getInstance(): AccessTokenManager {
    if (!AccessTokenManager.instance) {
      AccessTokenManager.instance = new AccessTokenManager();
    }
    return AccessTokenManager.instance;
  }

  // Method to set the access token and notify subscribers
  public setAccessToken(token: AccessToken): void {
    this.accessToken = token;
    this.notifySubscribers(); 
    this.updateServiceWorkerToken(); // Post the token to the service worker
  }

  // Method to get the access token
  public getAccessToken(): AccessToken {
    return this.accessToken;
  }

  // Method to subscribe to access token changes
  public subscribe(subscriber: (token: AccessToken) => void): void {
    this.subscribers.push(subscriber);
  }

  // Method to unsubscribe from access token changes
  public unsubscribe(subscriber: (token: AccessToken) => void): void {
    this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
  }

  // Notify all subscribers about access token changes
  private notifySubscribers(): void {
    this.subscribers.forEach(subscriber => {
      subscriber(this.accessToken);
    });
  }

  // Post the updated token to the service worker
  private updateServiceWorkerToken(): void {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'UPDATE_TOKEN',
        token: this.accessToken,
      });
    } else {
      console.warn('[AccessTokenManager] No active service worker found');
    }
  }

  // Method to reset the access token to undefined and remove the cookie (logout)
  public async reset(): Promise<void> {
    try {
      this.setAccessToken(undefined);
      const logoutEndpoint = import.meta.env.VITE_LOGOUT_ENDPOINT;
      const response = await fetch(logoutEndpoint, { method: 'GET', credentials: 'include' });
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      const userStore = useUserStore();
      userStore.clearUsername();
      userStore.setLoginHidden(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Method to update the access token based on refresh
  public async updateAccessToken(): Promise<AccessToken> {
    try {
      const refreshEndpoint = import.meta.env.VITE_REFRESH_ENDPOINT;
      const response = await fetch(refreshEndpoint, { method: 'GET', credentials: 'include' });
      if (!response.ok) {
        throw new Error('Failed to fetch access token from refresh endpoint');
      }
      const data = await response.json();
      this.setAccessToken(data.token);

      const userStore = useUserStore();
      userStore.setUsername(data.username);
      userStore.setLoginHidden(true);
      return this.accessToken;

    } catch (error) {
      console.error(error);
      this.setAccessToken(undefined);
      return undefined;
    }
  }
}
