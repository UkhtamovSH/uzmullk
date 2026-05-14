import { useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, AlertCircle, Download } from "lucide-react";
import DetailsCard from "@/components/ui/DetailsCard";

export default function PlotInfo() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { card } = useOutletContext();

  const plotRows = [
    { label: t("plotArea1"), value: `${card?.totalArea   ?? 1000} м²` },
    { label: t("plotArea2"), value: `${card?.usableArea  ?? 1000} м²` },
    { label: t("plotArea3"), value: `${card?.buildArea   ?? 1000} м²` },
    { label: t("plotArea4"), value: `${card?.actualArea  ??  650} м²` },
    { label: t("plotArea5"), value: `${card?.captureArea ??  340} м²` },
    { label: t("plotArea6"), value: `${card?.yardArea    ??  340} м²` },
  ];

  const buildingRows = [
    { label: t("buildArea1"), value: `${card?.totalBuildArea  ?? 0} м²` },
    { label: t("buildArea2"), value: `${card?.livingArea       ?? 0} м²` },
    { label: t("buildArea3"), value: `${card?.usefulArea       ?? 0} м²` },
  ];

  return (
    <div className="px-4 sm:px-6 py-6">
      {/* Sarlavha */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigate("/profile/cards")}
            className="hidden md:flex w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 items-center justify-center transition-colors shrink-0"
          >
            <ArrowLeft size={18} className="text-gray-600" strokeWidth={2.5} />
          </button>
          <h2 className="text-[22px] font-bold text-[#090A0A]">{t("plotInfoTitle")}</h2>
          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <AlertCircle size={14} className="text-gray-400" />
          </div>
        </div>
        <button className="w-10 h-10 rounded-xl bg-[#1C1C1E] hover:bg-black flex items-center justify-center transition-colors shrink-0">
          <Download size={17} className="text-white" strokeWidth={2} />
        </button>
      </div>

      {/* 2 ustunli grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DetailsCard title={t("plotSection")} rows={plotRows} bg="#F8F9FB" />
        <DetailsCard title={t("buildingSection")} rows={buildingRows} bg="#F8F9FB" />
      </div>
    </div>
  );
}
