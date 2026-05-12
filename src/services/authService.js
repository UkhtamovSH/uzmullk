import Axios from "@/utils/httpClient";
import { AUTH_URL } from "@/utils/constants/env.variables";
import { generateSecureToken } from "@/utils/security";

// Demo: agar telefon raqami 998901234567 bo'lsa → admin, aks holda → user
const ADMIN_PHONE = "998901234567";

export async function requestOtp(phone) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  // Mock: har qanday to'g'ri raqamga OTP yuboriladi
  if (!phone || phone.length < 9) {
    throw new Error("Telefon raqami noto'g'ri");
  }
  return { success: true };
}

export async function verifyOtp(phone, code) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!code || code.length !== 6) {
    throw new Error("Kod noto'g'ri");
  }

  const isAdmin = phone === ADMIN_PHONE;

  const user = {
    id: Date.now(),
    phone,
    name: isAdmin ? "Administrator" : "Foydalanuvchi",
    role: isAdmin ? "admin" : "user",
  };

  const token = generateSecureToken();
  return { user, token };
}

export async function verifyOneId(oneCode) {
  const { data } = await Axios(AUTH_URL).post("auth/verify/one-id", {
    one_code: oneCode,
  });
  return { user: data.user, token: data.token };
}
