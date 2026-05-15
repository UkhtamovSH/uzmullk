import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import bannerBg from "@/assets/banner_bg.png";
import bannerApp from "@/assets/banner_app.png";
import bannerGoogle from "@/assets/banner_google.png";
import brandWhite from "@/assets/brandWhite.svg";

export default function AppBanner() {
  const { t } = useTranslation();

  return (
    <section className="container relative pt-[60px]">
      <div className="overflow-hidden relative flex rounded-[20px]">
        <img
          src={bannerBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none mx-0"
        />
        <div className="text-white px-[14px] py-[28px] sm:p-[28px] md:p-[37px] z-10">
          <Link to="/">
            <img
              src={brandWhite}
              alt="Uzmulk"
              className="h-7 mb-5 inline-block"
            />
          </Link>
          <div className="w-full sm:w-[450px] md:w-[500px] lg:w-[650px] xl:w-[705px] space-y-2">
            <h3 className="text-xl sm:text-2xl md:text-[27px] font-medium">
              {t("bannerTitle")}
            </h3>
            <p className="text-[14px] font-medium">{t("bannerDesc")}</p>
          </div>
          <div className="flex gap-3 mt-6">
            <a href="#">
              <img
                src={bannerApp}
                alt="Download on the App Store"
                className="lg:h-10 md:h-7 h-5 hover:opacity-80 transition-opacity"
              />
            </a>
            <a href="#">
              <img
                src={bannerGoogle}
                alt="Get it on Google Play"
                className="lg:h-10 md:h-7 h-5 hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
