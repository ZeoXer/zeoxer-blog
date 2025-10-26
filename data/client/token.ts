import Cookies from "js-cookie";

const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY as string;

export const getAuthToken = () => {
  return Cookies.get(AUTH_TOKEN_KEY);
};

export const setAuthToken = (token: string) => {
  Cookies.set(AUTH_TOKEN_KEY, token, { expires: 1 });
};

export const clearAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!Cookies.get(AUTH_TOKEN_KEY);
};
