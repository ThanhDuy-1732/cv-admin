// Utilities
import { defineStore } from 'pinia';
import { AxiosInstance } from 'axios';

// Models
import { User } from '@/models/user.model';

// Apis
import { authApi, LoginParam } from '@/api/auth.api';

// Store
import { useHttpStore } from '@/store/http.store';

export type AuthState = {
  user?: User | null,
  accessToken: string,
  refreshToken: string,
  isRefreshingToken: boolean,
}

export type AuthGetters = {
  http(): AxiosInstance,
}

export type AuthActions = {
  clearAuth(): void;
  getMe(): Promise<void>;
  logout(): Promise<void>;
  getToken(): Promise<void>;
  login(payload: LoginParam): Promise<void>;
}

export const useAuthStore = defineStore<'auth', AuthState, AuthGetters, AuthActions>('auth', {
  state: () => ({
    user: null,
    accessToken: '',
    refreshToken: '',
    isRefreshingToken: false,
  }),

  getters: {
    http: () => {
      return useHttpStore().instance();
    }
  },

  actions: {
    async login(payload) {
      const response = await authApi(this.http).login(payload);

      this.accessToken = response.data.token;
      this.refreshToken = response.data.refreshToken;

      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    },

    async getMe() {
      const response = await authApi(this.http).getMe();

      this.user = response.data.user;
    },

    async getToken() {
      const http = useHttpStore().instance({
        token: localStorage.getItem('refreshToken') || '',
      });

      this.isRefreshingToken = true;

      const response = await authApi(http).getToken();

      this.isRefreshingToken = false;

      this.accessToken = response.data.token;
      localStorage.setItem('accessToken', response.data.token);
    },

    async logout() {
      await authApi(this.http).logout();
    },

    clearAuth() {
      this.accessToken = '';
      this.refreshToken = '';
      this.isRefreshingToken = false;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }
});

export const authStorePlugin = () => {
  // const authStore = useAuthStore();

  // authStore.getMe();
}