import { cookies } from "next/headers";

export const getAuthTokenServer = async () => {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get(
    process.env.AUTH_TOKEN_KEY || "auth_token"
  );
  return tokenCookie?.value;
};

export const setAuthTokenServer = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(process.env.AUTH_TOKEN_KEY || "auth_token", token, {
    expires: 1,
  });
};
