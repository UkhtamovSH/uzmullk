import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuthStore from "@/store/useAuthStore";
import FrameIcon from "@/assets/svg/FrameIcon";
import CardsIcon from "@/assets/svg/CardsIcon";
import NotifStatusIcon from "@/assets/svg/NotifStatusIcon";
import KeySquareIcon from "@/assets/svg/KeySquareIcon";
import TimerIcon from "@/assets/svg/TimerIcon";
import ClockIcon from "@/assets/svg/ClockIcon";
import SettingsIcon from "@/assets/svg/SettingsIcon";
import HomeSideIcon from "@/assets/svg/HomeSideIcon";
import ArrowUpRightIcon from "@/assets/svg/ArrowUpRightIcon";

export default function MainProfile() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);

  const STATS = [
    { to: "cards", icon: CardsIcon, label: t("navCards"), value: 3 },
    { to: "applications", icon: NotifStatusIcon, label: t("navApplications"), value: 2 },
    { to: "requests", icon: HomeSideIcon, label: t("navRequests"), value: 5 },
    { to: "payments", icon: TimerIcon, label: t("navPayments"), value: 12 },
  ];

  const QUICK_LINKS = [
    { to: "personal", icon: FrameIcon, label: t("navPersonal") },
    { to: "cards", icon: CardsIcon, label: t("navCards") },
    { to: "applications", icon: NotifStatusIcon, label: t("navApplications") },
    { to: "settings", icon: SettingsIcon, label: t("navSettings") },
    { to: "access", icon: KeySquareIcon, label: t("navAccess") },
    { to: "services-history", icon: ClockIcon, label: t("navServicesHistory") },
  ];

  return (
    <>
      {/* Welcome header — SectionHeader style */}
      <div className="bg-white border border-[#E4E7EC] rounded-[20px] px-[34px] py-5 mb-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-gray-500">Xush kelibsiz</p>
          <h1 className="text-[20px] font-semibold text-[#090A0A] truncate mt-0.5">
            {user?.name ?? "Foydalanuvchi"}
          </h1>
        </div>
        <div className="w-12 h-12 rounded-full bg-[#F1F5F9] flex items-center justify-center shrink-0 overflow-hidden">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-bold text-[#18181B]">
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </span>
          )}
        </div>
      </div>

      {/* Stats — service-tile style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {STATS.map(({ to, icon: Icon, label, value }) => (
          <Link
            key={to}
            to={to}
            className="min-h-[140px] flex flex-col justify-between bg-[#F1F5F9] p-4 sm:p-5 rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white group"
          >
            <div className="flex items-start justify-between">
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-110 text-[#18181B]">
                <Icon size={28} />
              </div>
              <ArrowUpRightIcon />
            </div>
            <div className="mt-4">
              <p className="text-[28px] font-bold text-[#090A0A] leading-none">
                {value}
              </p>
              <p className="text-[13px] text-gray-500 font-medium mt-1.5">
                {label}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links — tile grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {QUICK_LINKS.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className="min-h-[100px] flex items-center justify-between gap-3 bg-[#F1F5F9] p-4 sm:p-5 rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-110 text-[#18181B]">
                <Icon size={28} />
              </div>
              <p className="text-[15px] sm:text-[17px] font-semibold text-[#090A0A] leading-snug truncate">
                {label}
              </p>
            </div>
            <ArrowUpRightIcon />
          </Link>
        ))}
      </div>
    </>
  );
}
