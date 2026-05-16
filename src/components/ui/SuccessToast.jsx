import { useEffect } from "react";
import { X } from "lucide-react";

function CheckCircleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8 12.5L10.6 15L16 9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SuccessToast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!duration) return;
    const id = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(id);
  }, [duration, onClose]);

  return (
    <div className="fixed top-[80px] left-1/2 -translate-x-1/2 z-[60]">
      <div
        className="flex items-center gap-3 bg-[#1FBA66] text-white pl-3 pr-3 py-3 rounded-xl"
        style={{ boxShadow: "0px 10px 24px 0px rgba(31, 186, 102, 0.35)" }}
      >
        <span className="shrink-0 text-white">
          <CheckCircleIcon />
        </span>
        <span className="text-[15px] font-semibold whitespace-nowrap pr-2">
          {message}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-white hover:opacity-80 transition-opacity"
          aria-label="close"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
