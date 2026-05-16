import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Service1Icon from "@/assets/svg/Service1Icon";
import Service2Icon from "@/assets/svg/Service2Icon";
import Service3Icon from "@/assets/svg/Service3Icon";
import Service4Icon from "@/assets/svg/Service4Icon";
import Service5Icon from "@/assets/svg/Service5Icon";
import Service6Icon from "@/assets/svg/Service6Icon";
import EyeBoldIcon from "@/assets/svg/EyeBoldIcon";
import ArrowDownIcon from "@/assets/svg/ArrowDownIcon";
import ArrowUpRightIcon from "@/assets/svg/ArrowUpRightIcon";

const SERVICES = [
  { id: 1,  nameKey: "service1",  icon: Service1Icon, views: 2381, apps: 839 },
  { id: 2,  nameKey: "service2",  icon: Service1Icon, views: 2381, apps: 839 },
  { id: 3,  nameKey: "service3",  icon: Service1Icon, views: 2381, apps: 839 },
  { id: 4,  nameKey: "service4",  icon: Service2Icon, views: 2382, apps: 840 },
  { id: 5,  nameKey: "service5",  icon: Service2Icon, views: 2382, apps: 840 },
  { id: 6,  nameKey: "service6",  icon: Service2Icon, views: 2382, apps: 840 },
  { id: 7,  nameKey: "service7",  icon: Service3Icon, views: 2383, apps: 841 },
  { id: 8,  nameKey: "service8",  icon: Service3Icon, views: 2383, apps: 841 },
  { id: 9,  nameKey: "service9",  icon: Service3Icon, views: 2383, apps: 841 },
  { id: 10, nameKey: "service10", icon: Service4Icon, views: 2384, apps: 842 },
  { id: 11, nameKey: "service11", icon: Service4Icon, views: 2384, apps: 842 },
  { id: 12, nameKey: "service12", icon: Service4Icon, views: 2384, apps: 842 },
  { id: 13, nameKey: "service13", icon: Service5Icon, views: 2385, apps: 843 },
  { id: 14, nameKey: "service14", icon: Service5Icon, views: 2385, apps: 843 },
  { id: 15, nameKey: "service15", icon: Service5Icon, views: 2385, apps: 843 },
  { id: 16, nameKey: "service16", icon: Service6Icon, views: 2386, apps: 844 },
  { id: 17, nameKey: "service17", icon: Service6Icon, views: 2386, apps: 844 },
  { id: 18, nameKey: "service18", icon: Service6Icon, views: 2386, apps: 844 },
];

export default function PropertyServices() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useOutletContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {SERVICES.map((s) => (
        <div
          key={s.id}
          onClick={() => navigate(`/services/${s.id}`)}
          className="min-h-[140px] sm:min-h-[160px] flex flex-col justify-between bg-[#F1F5F9] p-4 sm:p-5 rounded-[20px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white group"
        >
          <div className="flex items-center gap-3">
            <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
              {React.createElement(s.icon)}
            </div>
            <p className="text-[15px] sm:text-[17px] font-semibold text-[#090A0A] leading-snug">
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
                <ArrowDownIcon />
                {s.apps}
              </span>
            </div>
            <ArrowUpRightIcon />
          </div>
        </div>
      ))}
    </div>
  );
}
