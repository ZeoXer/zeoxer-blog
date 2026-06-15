import { APIResponse, LoginResponse } from "../types/auth";
import { API_ENDPOINTS } from "./client/endpoints";
import { HttpClient } from "./client/http-client";

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
