import axios from "axios";
import { MAIN_URL } from "./constants/env.variables";
import toastUi from "./toastUi";
import { getToken, removeToken } from "./tokenStorge";

const cleanUrl = (url) => {
  return url
    .replace(/&&+/g, "&")
    .replace(/\?&+/g, "?")
    .replace(/\?+$/, "")
    .replace(/&+$/, "");
};

const Axios = (Api_Url, access_token) => {
  const token = access_token ? access_token : getToken();
  const current_lan = localStorage.getItem("i18nextLng") || "uz";

  const defaultOptions = {
    baseURL: Api_Url ? Api_Url : MAIN_URL,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
          ["Accept-Language"]: current_lan,
        }
      : {},
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.response.use(
    (response) => response,
    (e) => {
      if (e?.response) {
        const status = e.response.status;
        if (status === 401) {
          removeToken();
          return Promise.reject(e);
        } else if (status === 403) {
          toastUi.warning(
            localStorage.getItem("i18nextLng") === "uz"
              ? "403 - Ruxsat yo'q"
              : "403 - Нет разрешения"
          );
        }
      } else if (e?.message === "Network Error") {
        toastUi.warning(
          localStorage.getItem("i18nextLng") === "uz"
            ? "Internetingiz uzildi!"
            : "Нет подключения к Интернету!"
        );
      }
      return Promise.reject(e);
    }
  );

  return {
    get: (url, options = {}) => {
      const filteredParams = {
        ...defaultOptions.params,
        ...options.params,
      };
      Object.keys(filteredParams).forEach(
        (key) =>
          (filteredParams[key] == null ||
            filteredParams[key] == undefined ||
            filteredParams[key] === "") &&
          delete filteredParams[key]
      );
      return instance.get(cleanUrl(url), {
        ...options,
        params: filteredParams,
      });
    },
    post: (url, data, options = {}) => instance.post(url, data, { ...options }),
    put: (url, data, options = {}) => instance.put(url, data, { ...options }),
    delete: (url, options = {}) => instance.delete(url, { ...options }),
    patch: (url, data, options = {}) =>
      instance.patch(url, data, { ...options }),
  };
};

export default Axios;
