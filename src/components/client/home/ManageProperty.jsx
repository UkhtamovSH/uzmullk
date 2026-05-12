import { Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import managePropertyImg from "../../../assets/manageproperty.png";
import { formatCadastral } from "../../../utils/formatCadastral";

const ManageProperty = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const isCadastralValid = value === "" || /^\d{2}:\d{2}:.+$/.test(value);

  const handleChange = (e) => {
    setValue(formatCadastral(e.target.value));
  };

  return (
    <section className="relative pt-8 pb-8 sm:pt-[48px] sm:pb-[36.6px]">
      <img
        src={managePropertyImg}
        alt=""
        className="absolute top-0 w-full h-full z-0 object-cover"
      />
      <div className="relative container">
        <h1 className="text-lg sm:text-[24px] font-bold text-white text-center leading-snug">
          {t('heroTitle')}
        </h1>
        <p className="text-sm sm:text-[16px] font-medium text-white text-center mt-2">
          {t('heroDesc')}
        </p>

        <p className="text-sm sm:text-[16px] font-medium text-[#8FA1FF] text-center mt-8 sm:mt-[40px] mb-3 sm:mb-[15.4px]">
          {t('cadastreLabel')}
        </p>
        <div className="flex items-center w-full max-w-[590px] h-[56px] sm:h-[69px] mx-auto bg-white rounded-[14px] overflow-hidden shadow-[0px_49px_14px_rgba(19,45,174,0.01),0px_31px_13px_rgba(19,45,174,0.07),0px_18px_11px_rgba(19,45,174,0.25),0px_8px_8px_rgba(19,45,174,0.43),0px_2px_4px_rgba(19,45,174,0.49)]">
          <input
            value={value}
            onChange={handleChange}
            placeholder={t('cadastrePlaceholder')}
            className={`outline-none placeholder:text-gray-400 text-sm sm:text-[22px] font-medium w-full h-full px-4 sm:p-[20px] ${isCadastralValid ? "text-[#848F9E]" : "text-red-500"}`}
          />
          <button
            className={`flex items-center justify-center w-[54px] sm:w-[70px] h-[46px] sm:h-[60px] mr-1.5 rounded-[12px] shrink-0 transition-colors duration-300 ${value && isCadastralValid ? "bg-primary" : "bg-[#E2E8F0]"}`}
          >
            <Search size={20} className={`sm:hidden transition-colors duration-300 ${value && isCadastralValid ? "text-white" : "text-gray-500"}`} />
            <Search size={24} className={`hidden sm:block transition-colors duration-300 ${value && isCadastralValid ? "text-white" : "text-gray-500"}`} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ManageProperty;
