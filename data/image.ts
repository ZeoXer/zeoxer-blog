import { APIResponse } from "@/types/auth";
import { HttpClient } from "./client/http-client";
import { API_ENDPOINTS } from "./client/endpoints";

export async function listImagesInBucket() {
  const response = await HttpClient.get<APIResponse<R2Object[]>>(
    API_ENDPOINTS.LIST_BUCKET_IMAGES
  );

  return response;
}

export async function uploadImageToR2(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await HttpClient.put<APIResponse<string>>(
    API_ENDPOINTS.UPLOAD_IMAGE_R2,
    formData,
    {
      headers: {
        "Content-Type": file.type,
      },
    }
  );

  return response;
}
