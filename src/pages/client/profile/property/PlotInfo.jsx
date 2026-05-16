import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DetailsCard from "@/components/ui/DetailsCard";

export default function PlotInfo() {
  const { t } = useTranslation();
  const { card } = useOutletContext();

  const plotRows = [
    { label: t("plotArea1"), value: `${card?.totalArea ?? 1000} м²` },
    { label: t("plotArea2"), value: `${card?.usableArea ?? 1000} м²` },
    { label: t("plotArea3"), value: `${card?.buildArea ?? 1000} м²` },
    { label: t("plotArea4"), value: `${card?.actualArea ?? 650} м²` },
    { label: t("plotArea5"), value: `${card?.captureArea ?? 340} м²` },
    { label: t("plotArea6"), value: `${card?.yardArea ?? 340} м²` },
  ];

  const buildingRows = [
    { label: t("buildArea1"), value: `${card?.totalBuildArea ?? 0} м²` },
    { label: t("buildArea2"), value: `${card?.livingArea ?? 0} м²` },
    { label: t("buildArea3"), value: `${card?.usefulArea ?? 0} м²` },
  ];

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <DetailsCard title={t("plotSection")} rows={plotRows} />
        </div>
        <div>
          <DetailsCard title={t("buildingSection")} rows={buildingRows} />
        </div>
      </div>
    </div>
  );
}
