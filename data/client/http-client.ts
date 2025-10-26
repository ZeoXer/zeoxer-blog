import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { clearAuthToken, getAuthToken } from "./token";

// Create an instance of Axios with the base URL
const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

const whiteList = ["/admin/login"];
const checkUrlInWhiteList = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return whiteList.includes(window.location.pathname);
};

const errStatus = [401, 500];
const checkStatus = (status: number) => {
  return errStatus.includes(status);
};

Axios.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (checkStatus(error.response?.status) && !checkUrlInWhiteList()) {
      clearAuthToken();
      window.location.assign("admin/login");
    }

    return Promise.reject(error);
  }
);

export class HttpClient {
  // Define a function to make a GET request
  static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await Axios.get(url, config);
    return response.data;
  }

  // Define a function to make a POST request
  static async post<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await Axios.post(url, data, config);
    return response.data;
  }

  // Define a function to make a PUT request
  static async put<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await Axios.put(url, data, config);
    return response.data;
  }

  // Define a function to make a DELETE request
  static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await Axios.delete(url, config);
    return response.data;
  }
}
