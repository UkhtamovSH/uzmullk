import { useState } from "react";
import { NavLink, Outlet, useNavigate, useMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  UserCircle, CreditCard, Building2, FileText,
  Settings2, MessageSquare, Shield, Receipt,
  ClipboardList, ChevronRight, Menu, X, LogOut,
} from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

function Sidebar({ onClose }) {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const NAV_ITEMS = [
    { to: "personal",         icon: UserCircle,    label: t("navPersonal") },
    { to: "cards",            icon: CreditCard,    label: t("navCards") },
    { to: "property",         icon: Building2,     label: t("navProperty") },
    { to: "applications",     icon: FileText,      label: t("navApplications"), badge: 2 },
    { to: "settings",         icon: Settings2,     label: t("navSettings") },
    { to: "requests",         icon: MessageSquare, label: t("navRequests") },
    { to: "access",           icon: Shield,        label: t("navAccess") },
    { to: "payments",         icon: Receipt,       label: t("navPayments") },
    { to: "services-history", icon: ClipboardList, label: t("navServicesHistory") },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all group ${
      isActive
        ? "bg-[#172AB4] text-white shadow-sm"
        : "text-[#4A4F68] hover:bg-[#172AB4]/8 hover:text-[#172AB4]"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <aside className="flex flex-col h-full">
      {/* User info */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#172AB4]/10 flex items-center justify-center shrink-0 overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-[#172AB4]">
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-[#090A0A] truncate">
              {user?.name ?? "Foydalanuvchi"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{user?.phone ?? ""}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-auto p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          )}
        </div>
      </div>

      <div className="mx-5 h-px bg-[#E2E5EE]" />

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, icon: Icon, label, badge }) => (
          <NavLink key={to} to={to} end className={linkClass} onClick={onClose}>
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  className={isActive ? "text-white" : "text-gray-400 group-hover:text-[#172AB4]"}
                />
                <span className="flex-1">{label}</span>
                {badge ? (
                  <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold leading-none">
                    {badge}
                  </span>
                ) : (
                  <ChevronRight
                    size={14}
                    className={
                      isActive ? "text-white/70" : "text-gray-300 group-hover:text-[#172AB4]/40"
                    }
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mx-5 h-px bg-[#E2E5EE]" />

      {/* Logout */}
      <div className="px-3 py-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          {t("navLogout")}
        </button>
      </div>
    </aside>
  );
}

export default function ProfileLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isPropertyDetail = useMatch("/profile/cards/:id/*");

  return (
    <div className="container py-6 md:py-10">
      <div className="flex gap-6 items-start">

        {/* Desktop sidebar — property detail da yashiriladi */}
        {!isPropertyDetail && (
          <div className="hidden md:flex flex-col w-[260px] shrink-0 bg-white border border-[#E2E5EE] rounded-2xl overflow-hidden sticky top-[90px]">
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
              <span className="text-base font-semibold text-[#090A0A]">Profil</span>
            </div>
          )}

          <Outlet />
        </div>
      </div>
    </div>
  );
}
