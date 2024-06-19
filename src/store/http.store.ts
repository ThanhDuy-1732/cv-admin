// Utilities
import { defineStore } from "pinia";
import queryString from "query-string";
import axios, { AxiosError, AxiosInstance } from "axios";

export type HttpConfig = {
  token?: string;
  userAgent?: string;
};

type HttpState = {};

type HttpGetters = {
  instance(state?: HttpState): (customConfig?: HttpConfig) => AxiosInstance;
};

type HttpActions = {};

export const useHttpStore = defineStore<"http", HttpState, HttpGetters, HttpActions>("http", {
  state: () => ({}),

  getters: {
    instance: (state) => (customConfig) => {
      const http = axios.create({
        baseURL: import.meta.env.VITE_SERVER_API,
        paramsSerializer: function (params) {
          return queryString.stringify(params, {
            skipNull: true,
            skipEmptyString: true,
          });
        },
      });

      http.interceptors.request.use((config) => {
        config.headers.setContentType("application/json");
        
        if (customConfig?.token) {
          config.headers.setAuthorization(`Bearer ${customConfig.token}`);
          return config;
        }
        
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers.setAuthorization(`Bearer ${accessToken}`);
        }

        console.log('customConfig', customConfig)

        if (customConfig?.userAgent) {
          config.headers.setUserAgent(customConfig?.userAgent);
        }

        return config;
      });

      http.interceptors.response.use((response) => {
        return response;
      }, (error) => {
        throw new ApiError(error);
      })

      return http;
    },
  },
});

export type ErrorResponseData = any & {
  message: string;
}

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(error: AxiosError) {
    super();

    this.message = (error.response?.data as ErrorResponseData)?.message;
    this.code = error.code as string;
    this.status = error.response?.status as number;
  }

  static isApiError(error: any) {
    return error instanceof ApiError
  }
}
