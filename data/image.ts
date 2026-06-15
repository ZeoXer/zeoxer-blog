import { APIResponse } from "@/types/auth";
import { HttpClient } from "./client/http-client";
import { API_ENDPOINTS } from "./client/endpoints";

export async function listImagesInBucket() {
  const response = await HttpClient.get<APIResponse<R2Object[]>>(
    API_ENDPOINTS.STORAGE
  );

  return response;
}

export async function uploadImageToR2(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  // Let axios set the multipart boundary; do not override Content-Type.
  const response = await HttpClient.post<APIResponse<string>>(
    API_ENDPOINTS.STORAGE,
    formData
  );

  return response;
}
