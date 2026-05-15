import React from "react";
import frameGroup from "@/assets/framegroup.png";
import { useTranslation } from "react-i18next";

const Capabilities = () => {
  const { t } = useTranslation();

  return (
    <section className="container pt-[60px]">
      <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-[#090A0A]">
        {t('capabilitiesTitle')}
      </h2>
      <p className="text-sm sm:text-base md:text-lg font-semibold text-[#090A0A] mb-[30px]">
        {t('capabilitiesSubtitle')}
      </p>

      <div className="w-full overflow-hidden">
        <img src={frameGroup} alt="Capabilities" className="w-full h-auto" />
      </div>
    </section>
  );
};

export default Capabilities;
