import CloseCircleIcon from "../../../assets/svg/CloseCircleIcon";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatCadastral } from "../../../utils/formatCadastral";

const CadastreModal = ({ onClose, onNext }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const isValid = value === "" || /^\d{2}:\d{2}:.+$/.test(value);

  const handleChange = (e) => {
    setValue(formatCadastral(e.target.value));
  };

  const handleNext = () => {
    if (!value || !isValid) return;
    onNext?.(value);
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={handleBackdrop}
    >
      <div className="w-full max-w-[520px] bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0px 10px 40px 0px #00000026" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("addCardTitle")}
          </h2>
          <button onClick={onClose} className="flex items-center justify-center text-[#CBD5E1] hover:text-[#172AB4] transition-colors">
            <CloseCircleIcon />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pt-8 pb-6">
          <p className="text-base font-semibold text-gray-900 text-center leading-snug mb-8">
            {t("addCardDesc")}
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("addCardInputLabel")}
            </label>
            <input
              value={value}
              onChange={handleChange}
              placeholder={t("cadastrePlaceholder")}
              className={`w-full h-[52px] px-4 rounded-xl border text-sm font-medium outline-none transition-colors placeholder:text-gray-400
                ${isValid
                  ? "border-gray-200 text-gray-700 focus:border-primary"
                  : "border-red-400 text-red-500 focus:border-red-500"
                }`}
            />
            {!isValid && (
              <p className="mt-1.5 text-xs text-red-500">
                Noto'g'ri kadastr raqami formati
              </p>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={!value || !isValid}
            className="w-full h-[52px] rounded-xl text-sm font-semibold transition-colors duration-200
              disabled:bg-[#E2E8F0] disabled:text-gray-400 disabled:cursor-not-allowed
              bg-primary text-white hover:opacity-90"
          >
            {t("addCardNext")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CadastreModal;
