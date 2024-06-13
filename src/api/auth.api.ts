// APIs
import { AxiosResponse } from 'axios';
import { http } from './http';

export type LoginParam = {
  username: string,
  password: string,
  userAgent?: string;
};

export type LoginData = {
  token: string,
  refreshToken: string,
}

export type getMeData = {
  user: any,
}

export const login = async (data: LoginParam): Promise<AxiosResponse<LoginData>> => {
  return await http.post('/auth/sign-in', data);
};

export const getMe = async (): Promise<AxiosResponse<getMeData>> => {
  return await http.get('/me');
}