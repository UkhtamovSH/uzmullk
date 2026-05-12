import { deleteCookieW, getCookieW, setCookieW } from "./cookieStorge";

export const getStorage = (local) => {
  return local ? localStorage : sessionStorage;
};

export const getToken = () => {
  return getCookieW("access");
};

export const setToken = (token, local = true) => {
  setCookieW("access", token, 1);
};

export const removeToken = () => {
  deleteCookieW("access");
  deleteCookieW("refresh");
};

export const issetToken = () => {
  const token = getCookieW("access");
  if (!token || token === "undefined" || token === undefined) {
    return false;
  }
  return true;
};
