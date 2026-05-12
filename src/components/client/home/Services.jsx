import React from "react";
import { useTranslation } from "react-i18next";
import Service1Icon from "../../../assets/svg/Service1Icon";
import Service2Icon from "../../../assets/svg/Service2Icon";
import Service3Icon from "../../../assets/svg/Service3Icon";
import Service4Icon from "../../../assets/svg/Service4Icon";
import Service5Icon from "../../../assets/svg/Service5Icon";
import Service6Icon from "../../../assets/svg/Service6Icon";
import EyeBoldIcon from "../../../assets/svg/EyeBoldIcon";
import ArrowDownIcon from "../../../assets/svg/ArrowDownIcon";
import ArrowCircleRightIcon from "../../../assets/svg/ArrowCircleRightIcon";
import ArrowUpRightIcon from "../../../assets/svg/ArrowUpRightIcon";
import { useNavigate } from "react-router-dom";

const SERVICES = [
  { id: 1, nameKey: "service1", icon: Service1Icon, views: 2381, apps: 839 },
  { id: 2, nameKey: "service2", icon: Service2Icon, views: 2381, apps: 839 },
  { id: 3, nameKey: "service3", icon: Service3Icon, views: 2381, apps: 839 },
  { id: 4, nameKey: "service1", icon: Service4Icon, views: 2381, apps: 839 },
  { id: 5, nameKey: "service2", icon: Service5Icon, views: 2381, apps: 839 },
  { id: 6, nameKey: "service3", icon: Service6Icon, views: 2381, apps: 839 },
];

const Services = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate("/services");
  };

  return (
    <section className="container pt-[60px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#090A0A]">
          {t("services")}
        </h2>
        <button
          className="inline-flex items-center gap-1.5 cursor-pointer group"
          onClick={handleSeeAll}
        >
          <span className="text-[16px] font-semibold text-[#090A0A] group-hover:text-[#172AB4]">
            {t("seeAll")}
          </span>
          <ArrowCircleRightIcon />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SERVICES.map((s) => (
          <div
            key={s.id}
            onClick={() => navigate(`/services/${s.id}`)}
            className="min-h-[140px] sm:min-h-[160px] flex flex-col justify-between bg-[#F1F5F9] p-4 sm:p-5 rounded-[20px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                {React.createElement(s.icon, {
                  size: 14,
                  className: "text-white",
                })}
              </div>
              <p className="text-[15px] sm:text-[17px] lg:text-[18px] font-semibold text-[#090A0A] leading-snug">
                {t(s.nameKey)}
              </p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div className="flex items-center gap-3 text-[11px] text-gray-400">
                <span className="flex items-center gap-1">
                  <EyeBoldIcon />
                  {s.views}
                </span>
                <span className="flex items-center gap-1">
                  <ArrowDownIcon /> {s.apps}
                </span>
              </div>
              <ArrowUpRightIcon />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
