import { useState, useEffect } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
  useMatch,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, LogOut } from "lucide-react";
import BrushIcon from "@/assets/svg/BrushIcon";
import useAuthStore from "@/store/useAuthStore";
import FrameIcon from "@/assets/svg/FrameIcon";
import CardsIcon from "@/assets/svg/CardsIcon";
import NotifStatusIcon from "@/assets/svg/NotifStatusIcon";
import HomeSideIcon from "@/assets/svg/HomeSideIcon";
import KeySquareIcon from "@/assets/svg/KeySquareIcon";
import TimerIcon from "@/assets/svg/TimerIcon";
import ClockIcon from "@/assets/svg/ClockIcon";
import SettingsIcon from "@/assets/svg/SettingsIcon";
import ArrowCircleLeftIcon from "@/assets/svg/ArrowCircleLeftIcon";

const HEADER_CONFIG = {
  personal: { tKey: "navPersonal" },
  cards: { tKey: "navCards" },
  property: { tKey: "navProperty" },
  applications: { tKey: "navApplications" },
  settings: { tKey: "navSettings" },
  requests: { tKey: "navRequests" },
  access: { tKey: "navAccess" },
  payments: { tKey: "navPayments" },
  "services-history": { tKey: "navServicesHistory" },
};

function SectionHeader({ tKey, showEditAction = false, onEditClick, right }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-[#E4E7EC] rounded-[20px] px-[34px] py-4 mb-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 justify-between">
      <div
        className="inline-flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        <div className="text-[#000] hover:text-gray-700 transition-colors">
          <ArrowCircleLeftIcon />
        </div>
        <span className="text-[15px] font-semibold text-[#18181B] whitespace-nowrap">
          {t(tKey)}
        </span>
      </div>

      {right && <div className="flex items-center gap-3 md:ml-auto flex-wrap">{right}</div>}

      {showEditAction && (
        <button
          type="button"
          onClick={onEditClick}
          className="self-start md:self-auto hover:opacity-70 transition-opacity"
          aria-label="edit"
        >
          <BrushIcon />
        </button>
      )}
    </div>
  );
}

function Sidebar({ onClose }) {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const NAV_ITEMS = [
    { to: "personal", icon: FrameIcon, label: t("navPersonal") },
    { to: "cards", icon: CardsIcon, label: t("navCards") },
    {
      to: "applications",
      icon: NotifStatusIcon,
      label: t("navApplications"),
      badge: 2,
    },
    { to: "settings", icon: SettingsIcon, label: t("navSettings") },
    { to: "requests", icon: HomeSideIcon, label: t("navRequests") },
    { to: "access", icon: KeySquareIcon, label: t("navAccess") },
    { to: "payments", icon: TimerIcon, label: t("navPayments") },
    {
      to: "services-history",
      icon: ClockIcon,
      label: t("navServicesHistory"),
    },
  ];

  const linkClass = ({ isActive }) =>
    `relative flex items-center gap-3 px-3 py-3 rounded-xl text-[15px] transition-all ${
      isActive
        ? "bg-[#F1F5F9] text-[#18181B]"
        : "text-[#18181B] hover:bg-[#F1F5F9]"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <aside className="flex flex-col h-full p-3 gap-3">
      {/* User info card */}
      <div className="bg-[#F1F5F9] rounded-2xl px-4 py-3 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-bold text-[#18181B] truncate leading-tight">
            {user?.name ?? "Foydalanuvchi"}
          </p>
          <p className="text-[13px] font-medium text-[#475569] mt-1 truncate">
            {user?.phone ?? "—"}
          </p>
        </div>
        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden border border-white">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-[#18181B]">
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </span>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/50 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, icon: Icon, label, badge }) => (
          <NavLink key={to} to={to} end className={linkClass} onClick={onClose}>
            <Icon size={24} className="text-[#18181B] shrink-0" />
            <span className="flex-1 truncate font-semibold text-[15px] text-[#18181B]">
              {label}
            </span>
            {badge ? (
              <span className="min-w-[22px] h-[22px] px-1.5 flex items-center justify-center rounded-full bg-[#FF2F2F] text-white text-[11px] font-bold leading-none">
                {badge}
              </span>
            ) : null}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-3 rounded-xl text-[15px] font-semibold text-[#FF2F2F] hover:bg-[#FFF1F1] transition-colors"
      >
        <LogOut size={20} />
        {t("navLogout")}
      </button>
    </aside>
  );
}

export default function ProfileLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editClickTick, setEditClickTick] = useState(0);
  const isPropertyDetail = useMatch("/profile/cards/:id/*");
  const location = useLocation();
  const segment = location.pathname.split("/").filter(Boolean).pop();
  const headerConfig =
    !isPropertyDetail && segment !== "profile" ? HEADER_CONFIG[segment] : null;
  const showEditAction = segment === "personal";
  const [headerRight, setHeaderRight] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      <div className="container py-4">
        {headerConfig && (
          <SectionHeader
            {...headerConfig}
            showEditAction={showEditAction}
            onEditClick={() => setEditClickTick((c) => c + 1)}
            right={headerRight}
          />
        )}

        <div className="flex gap-[21px] items-start">
          {/* Desktop sidebar — property detail da yashiriladi */}
          {!isPropertyDetail && (
            <div className="hidden md:flex flex-col w-[284px] shrink-0 bg-white border border-[#E2E5EE] rounded-2xl overflow-hidden sticky top-[90px]">
              <Sidebar />
            </div>
          )}

          {/* Mobile drawer — property detail da ko'rsatilmaydi */}
          {!isPropertyDetail && (
            <>
              {drawerOpen && (
                <div
                  className="fixed inset-0 bg-black/40 z-40 md:hidden"
                  onClick={() => setDrawerOpen(false)}
                />
              )}
              <div
                className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 md:hidden ${
                  drawerOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <Sidebar onClose={() => setDrawerOpen(false)} />
              </div>
            </>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile top bar — property detail da yashiriladi */}
            {!isPropertyDetail && (
              <div className="flex items-center gap-3 mb-5 md:hidden">
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="p-2 rounded-xl bg-white border border-[#E2E5EE] hover:bg-gray-50 transition-colors"
                >
                  <Menu size={20} className="text-gray-600" />
                </button>
                <span className="text-base font-semibold text-[#090A0A]">
                  Profil
                </span>
              </div>
            )}

            <Outlet context={{ editClickTick, setHeaderRight }} />
          </div>
        </div>
      </div>
    </>
  );
}
