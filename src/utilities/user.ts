import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    username: '',
    loginHidden: false,
  }),
  actions: {
    setUsername(username: string) {
      this.username = username;
      localStorage.setItem('username', username);
    },
    clearUsername() {
      this.username = '';
      localStorage.removeItem('username');
    },
    setLoginHidden(hidden: boolean) {
      this.loginHidden = hidden;
      localStorage.setItem('loginHidden', hidden.toString());
    },
    loadFromLocalStorage() {
      const savedUsername = localStorage.getItem('username');
      if (savedUsername) {
        this.username = savedUsername;
      }
      const savedLoginHidden = localStorage.getItem('loginHidden');
      if (savedLoginHidden) {
        this.loginHidden = savedLoginHidden === 'true';
      }
    },
  },
});
