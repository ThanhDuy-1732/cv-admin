// Models
import { defineStore } from 'pinia';
import { User } from '@/models/user.model';

export type AuthState = {
  token: string,
  user?: User | null,
  refreshToken: string,
}

export type AuthGetters = {}

export type AuthActions = {
  getMe(): void;
  getToken(): void;
}

export const useAuthStore = defineStore<'auth', AuthState, AuthGetters, AuthActions>('auth', {
  state: () => ({
    token: '',
    user: null,
    refreshToken: '',
  }),

  getters: {},

  actions: {
    getMe: async () => {

    },

    getToken: async () => {

    }
  }
})