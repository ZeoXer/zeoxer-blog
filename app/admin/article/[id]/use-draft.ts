import { addToast } from "@heroui/toast";
import { get, set, del } from "idb-keyval";

export type TDraft<T> = {
  data: T;
  updatedAt: number;
};

export const readDraft = async <T>(key: string): Promise<TDraft<T> | null> => {
  try {
    const raw = await get<TDraft<T>>(key);
    if (!raw) return null;
    return JSON.parse(JSON.stringify(raw)) as TDraft<T>;
  } catch (error) {
    addToast({
      title: "讀取備份失敗",
      description: String(error),
      timeout: 3000,
      shouldShowTimeoutProgress: true,
      color: "danger",
    });
    return null;
  }
};

export const saveDraft = async <T>(key: string, data: T) => {
  const payload: TDraft<T> = { data, updatedAt: Date.now() };
  await set(key, payload);
};

export const deleteDraft = async (key: string) => await del(key);
