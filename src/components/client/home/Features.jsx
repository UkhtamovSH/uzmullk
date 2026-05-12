import { useTranslation } from "react-i18next";
import frame_features from "../../../assets/frame_features.png";
import BuildingIcon from "../../../assets/svg/BuildingIcon";
import RocketIcon from "../../../assets/svg/RocketIcon";
import ShoppingBagIcon from "../../../assets/svg/ShoppingBagIcon";
import ShieldZapIcon from "../../../assets/svg/ShieldZapIcon";

const Features = () => {
  const { t } = useTranslation();

  const FEATURES = [
    { icon: BuildingIcon, titleKey: "feature1Title", descKey: "feature1Desc" },
    { icon: RocketIcon,   titleKey: "feature2Title", descKey: "feature2Desc" },
    { icon: ShoppingBagIcon, titleKey: "feature3Title", descKey: "feature3Desc" },
    { icon: ShieldZapIcon,   titleKey: "feature4Title", descKey: "feature4Desc" },
  ];

  return (
    <section className="container pt-[60px]">
      <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#090A0A]">
        {t('featuresTitle')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        {FEATURES.map(({ icon: Icon, titleKey, descKey }) => (
          <div
            key={titleKey}
            className="rounded-[20px] overflow-hidden p-5 relative border border-[#BCE3F0]"
          >
            <img
              src={frame_features}
              alt=""
              className="absolute top-0 w-full h-full left-0 z-0 object-cover"
            />
            <div className="relative">
              <div className="mb-5">
                <Icon />
              </div>
              <p className="text-base sm:text-[18px] font-bold text-[#090A0A]">
                {t(titleKey)}
              </p>
              <p className="text-sm sm:text-[14px] font-semibold text-[#090A0A] mt-1">
                {t(descKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
