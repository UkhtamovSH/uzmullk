import { useEffect } from "react";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { verifyOneId } from "@/services/authService";
import LangDropdown from "@/components/ui/LangDropdown";
import brandWhite from "@/assets/brandWhite.svg";
import brandDark from "@/assets/brandDark.svg";
import { useTranslation } from "react-i18next";
import OneIdIcon from "../../../assets/svg/OneIdIcon";
import MyIdIcon from "../../../assets/svg/MyIdIcon";

const ONEID_URL = import.meta.env.VITE_ONEID_URL ?? "";

export default function OneIdPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const destination = location.state?.from?.pathname ?? "/";

  // Redirect back from OneID provider with ?code=...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    if (!code) return;

    verifyOneId(code)
      .then(({ user, token }) => {
        login(user, token);
        navigate(destination, { replace: true });
      })
      .catch(() => {
        navigate("/oneid", { replace: true });
      });
  }, []);

  if (isAuthenticated) return <Navigate to={destination} replace />;

  const handleContinue = () => {
    if (!ONEID_URL) return;
    const redirect = encodeURIComponent(window.location.origin + "/oneid");
    window.location.href = `${ONEID_URL}&redirect_uri=${redirect}`;
  };

  return (
    <div className="flex h-screen">
      {/* ── Left panel ── */}
      <div
        className="hidden md:flex flex-col w-[370px] xl:w-[477px] shrink-0 p-8"
        style={{
          background:
            "radial-gradient(92.45% 92.45% at 6.87% 5.93%, #00A5FE 34%, #0043DE 100%)",
        }}
      >
        <Link to="/"><img
          src={brandWhite}
          alt="Uzmulk"
          className="h-[34px] w-auto object-left object-contain"
        /></Link>

        <div className="flex-1 flex flex-col justify-center gap-4 py-8 px-16 text-center">
          <h2 className="text-white text-xl font-bold leading-snug">
            {t("loginLeftTitle")}
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            {t("bannerDesc")}
          </p>
        </div>

        <p
          className="text-xs text-center"
          style={{ color: "rgba(255, 255, 255, 1)" }}
        >
          Copyright © 2022 Uzmulk
        </p>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col bg-white overflow-y-auto">
        <div className="flex justify-end px-8 pt-6 shrink-0">
          <LangDropdown />
        </div>

        <div className="flex-1 flex items-center justify-center px-8 py-10">
          <div className="w-full max-w-[380px] space-y-7">
            <div className="flex justify-center">
              <Link to="/"><img src={brandDark} alt="Uzmulk" className="h-[38px] w-auto" /></Link>
            </div>

            <div className="text-center space-y-1.5">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t("loginWelcome")}
              </h1>
            </div>

            <div className="space-y-[10px]">
              <button
                type="button"
                onClick={handleContinue}
                // disabled={!ONEID_URL}
                className="justify-center flex w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(94.21deg, #00A5FE 10.94%, #0076FE 58.07%)",
                }}
              >
                <OneIdIcon />
              </button>
              <button
                type="button"
                // onClick={handleContinue}
                // disabled={!ONEID_URL}
                className="justify-center flex w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(94.21deg, #00A5FE 10.94%, #0076FE 58.07%)",
                }}
              >
                <MyIdIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
