// Utilities
import { AxiosInstance, AxiosResponse } from 'axios';

export type LoginParam = {
  username: string,
  password: string,
};

export type LoginData = {
  token: string,
  refreshToken: string,
}

export type getMeData = {
  user: any,
}

export type getTokenData = {
  token: string,
}

export const authApi = (http: AxiosInstance) => ({
  async login(data: LoginParam): Promise<AxiosResponse<LoginData>> {
    return await http.post('/auth/sign-in', data);
  },

  async getMe(): Promise<AxiosResponse<getMeData>> {
    return await http.get('/auth/me');
  },

  async logout(): Promise<void> {
    return await http.get('/auth/sign-out');
  },

  async getToken(): Promise<AxiosResponse<getTokenData>> {
    return await http.get('/auth/token');
  }
})