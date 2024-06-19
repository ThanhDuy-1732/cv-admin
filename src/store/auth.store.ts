// Utilities
import { defineStore } from 'pinia';
import { AxiosInstance } from 'axios';

// Models
import { User } from '@/models/user.model';

// Apis
import { authApi, LoginParam } from '@/api/auth.api';

// Store
import { useHttpStore } from '@/store/http.store';
import { useDeviceStore } from '@/store/device.store';

export type AuthState = {
  user?: User | null,
  accessToken: string,
  refreshToken: string,
}

export type AuthGetters = {
  http(): AxiosInstance,
}

export type AuthActions = {
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
  }),

  getters: {
    http: () => {
      return useHttpStore().instance({
        userAgent: useDeviceStore().deviceInfo,
      });
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

    },

    async logout() {
      await authApi(this.http).logout();
    }
  }
});

export const authStorePlugin = () => {
  // const authStore = useAuthStore();

  // authStore.getMe();
}