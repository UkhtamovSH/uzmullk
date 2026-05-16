import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CloseCircleIcon from "@/assets/svg/CloseCircleIcon";
import PhoneInput, { formatPhone } from "@/components/ui/PhoneInput";

function parseRawPhone(input) {
  const digits = String(input || "").replace(/\D/g, "");
  const withoutCountry = digits.startsWith("998") ? digits.slice(3) : digits;
  return withoutCountry.slice(0, 9);
}

export default function EditPhoneModal({ initialValue = "", onClose, onSave }) {
  const { t } = useTranslation();
  const [raw, setRaw] = useState(() => parseRawPhone(initialValue));

  useEffect(() => {
    setRaw(parseRawPhone(initialValue));
  }, [initialValue]);

  const initialRaw = parseRawPhone(initialValue);
  const isValid = raw.length === 9;
  const isDirty = raw !== initialRaw && isValid;

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = () => {
    if (!isDirty) return;
    onSave?.(`+998 ${formatPhone(raw)}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={handleBackdrop}
    >
      <div
        className="w-full max-w-[440px] bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: "0px 10px 40px 0px #00000026" }}
      >
        <div className="flex items-center justify-between px-6 pt-5">
          <h2 className="text-[18px] font-bold text-[#090A0A]">
            {t("editDataTitle")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#CBD5E1] hover:text-[#172AB4] transition-colors"
            aria-label="close"
          >
            <CloseCircleIcon />
          </button>
        </div>

        <div className="px-6 pt-6 pb-6">
          <p className="text-[15px] font-semibold text-[#090A0A] text-center leading-snug mb-6 px-2">
            {t("editPhoneDesc")}
          </p>

          <div className="mb-6">
            <label className="block text-[13px] font-medium text-[#475569] mb-2">
              {t("phoneNumber")}
            </label>
            <PhoneInput value={raw} onChange={setRaw} autoFocus />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isDirty}
            className={`w-full h-[52px] rounded-xl text-[15px] font-semibold transition-colors ${
              isDirty
                ? "text-white hover:opacity-90"
                : "bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed"
            }`}
            style={
              isDirty
                ? {
                    background:
                      "linear-gradient(94.21deg, #00A5FE 10.94%, #0076FE 58.07%)",
                  }
                : undefined
            }
          >
            {t("next")}
          </button>
        </div>
      </div>
    </div>
  );
}
