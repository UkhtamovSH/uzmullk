// Replace with your preferred toast library (e.g. react-hot-toast, sonner)
const show = (type, msg) => {
  const styles = {
    success: "background:#52c41a",
    info: "background:#1677ff",
    warning: "background:#faad14",
    error: "background:#ff4d4f",
  };
  const div = document.createElement("div");
  div.textContent = msg;
  div.setAttribute(
    "style",
    `position:fixed;top:70px;right:16px;z-index:10000;padding:10px 18px;border-radius:6px;color:#fff;font-size:14px;${styles[type]}`
  );
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
};

const toastUi = {
  success: (msg) => show("success", msg),
  info: (msg) => show("info", msg),
  warning: (msg) => show("warning", msg),
  error: (msg) => show("error", msg),
};

export default toastUi;
