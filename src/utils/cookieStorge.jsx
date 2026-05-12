export const setCookieW = (
  name,
  value,
  days = 7,
  path = "/",
  secure = false,
  sameSite = "Lax"
) => {
  const expires = days
    ? "; Expires=" +
      new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
    : "";
  const encValue = encodeURIComponent(value);
  const secureFlag = secure ? "; Secure" : "";
  const sameSiteStr = sameSite ? `; SameSite=${sameSite}` : "";
  document.cookie = `${name}=${encValue}${expires}; Path=${path}${secureFlag}${sameSiteStr}`;
};

export const getCookieW = (name) => {
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  for (let c of cookies) {
    const [key, ...v] = c.split("=");
    if (key === name) return decodeURIComponent(v.join("="));
  }
  return null;
};

export const deleteCookieW = (name, path = "/") => {
  document.cookie = `${name}=; Expires=${new Date(0).toUTCString()}; Path=${path}`;
};
