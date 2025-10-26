import { APIResponse, LoginResponse, User } from "../types/auth";
import { API_ENDPOINTS } from "./client/endpoints";
import { HttpClient } from "./client/http-client";

// Login API
export async function login(email: string, password: string) {
  const response = await HttpClient.post<APIResponse<LoginResponse>>(
    API_ENDPOINTS.LOGIN,
    {
      email,
      password,
    }
  );
  return response;
}

// Sign up API
export async function signUp(
  username: string,
  email: string,
  password: string
) {
  const response = await HttpClient.post<APIResponse<string>>(
    API_ENDPOINTS.SIGNUP,
    {
      username,
      email,
      password,
    }
  );
  return response;
}

export async function getMe() {
  const response = await HttpClient.get<APIResponse<User>>(API_ENDPOINTS.ME);
  return response;
}
