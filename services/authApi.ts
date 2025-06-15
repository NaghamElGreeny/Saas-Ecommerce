// import axiosInstance from "./axiosInstance";
import axiosInstance from "./axiosInstance";
import { handleResponse } from "./helpers";
import {
  LoginPayload,
  LogoutPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "../utils/types";

export const login = (payload: LoginPayload) =>
  handleResponse(axiosInstance.post("/auth/login", payload));

export const register = (payload: RegisterPayload) =>
  handleResponse(axiosInstance.post("/auth/register", payload));

export const logout = (payload: LogoutPayload) =>
  handleResponse(axiosInstance.post("/auth/logout", payload));

export const resetPassword = (payload: ResetPasswordPayload) =>
  handleResponse(axiosInstance.post("/auth/reset_password", payload));

export const verifyCode = async ({
  phone_code,
  phone,
  verification_code,
  verificationType,
}: {
  phone_code?: string;
  phone?: string;
  verification_code: string;
  verificationType: "register" | "forgot_password" | null;
}) => {
  const urlMap: Record<string, string> = {
    register: "/auth/verify_phone",
    forgot_password: "/auth/verify_forgot_password_code",
  };

  const url = verificationType ? urlMap[verificationType] : "";
  if (!url) throw new Error("Invalid verification type");

  const dataToSend =
    verificationType === "register"
      ? { phone_code, phone, verification_code }
      : { phone_code, phone, reset_code: verification_code };

  return handleResponse(axiosInstance.post(url, dataToSend));
};
