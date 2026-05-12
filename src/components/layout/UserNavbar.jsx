import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import useAuthStore from "@/store/useAuthStore";
import LangDropdown from "@/components/ui/LangDropdown";
import AddCircleIcon from "@/assets/svg/AddCircleIcon";
import CadastreModal from "@/components/client/home/CadastreModal";

const LANGS = [
  { value: "uz", name: "O'zbekcha" },
  { value: "ru", name: "Русский" },
];

const DASHBOARD_ROLES = ["admin", "moderator"];

const navLinkClass = ({ isActive }) =>
  `text-[16px] font-semibold py-[10px] px-[16px] transition-all ${
    isActive
      ? "border-b-[6px] border-[#172AB4]"
      : "border-b-[6px] border-transparent hover:border-[#172AB4] text-[#090A0A]"
  }`;

export default function UserNavbar() {
  const { t, i18n } = useTranslation();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const [userOpen, setUserOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (userRef.current && !userRef.current.contains(e.target))
        setUserOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const handleLogout = () => {
    setUserOpen(false);
    setDrawerOpen(false);
    logout();
    navigate("/", { replace: true });
  };

  const closeDrawer = () => setDrawerOpen(false);

  const canAccessDashboard = DASHBOARD_ROLES.includes(user?.role);

  return (
    <>
      <div className={`sticky top-0 z-30 w-full transition-all duration-300 shadow-[0px_1px_0px_0px_#E2E5EE] ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"}`}>
      <header className="container flex items-center py-[35px]">
        <Link to="/" className="flex items-center shrink-0">
          <img src="/src/assets/brandDark2.svg" alt="Uzmulk" className="h-7" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 ml-8">
          <NavLink to="/" className={navLinkClass}>{t("home")}</NavLink>
          <NavLink to="/services" className={navLinkClass}>{t("services")}</NavLink>
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-[#172AB4] hover:border-[#172AB4]/40 transition-colors"
          >
            <AddCircleIcon />
            {t("addObject")}
          </button>

          {isAuthenticated && user ? (
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setUserOpen((v) => !v)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#172AB4]/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#172AB4]">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 hidden sm:block">
                  {user.name}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform duration-200 ${userOpen ? "rotate-180" : ""}`}
                />
              </button>

              {userOpen && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 capitalize mt-0.5">{user.role}</p>
                  </div>
                  {canAccessDashboard && (
                    <Link
                      to="/dashboard"
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LayoutDashboard size={15} className="text-gray-400" />
                      {t("controlPanel")}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} />
                    {t("logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/oneid"
              className="px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-800 hover:border-gray-400 transition-colors"
            >
              {t("loginLink")}
            </Link>
          )}

          <LangDropdown />
        </div>

        {/* Mobile: hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="md:hidden ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Menyu"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
      </header>
      </div>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeDrawer}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 md:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <Link to="/" onClick={closeDrawer}>
            <img src="/src/assets/brandDark2.svg" alt="Uzmulk" className="h-6" />
          </Link>
          <button
            onClick={closeDrawer}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-3 pt-4 gap-1">
          <NavLink
            to="/"
            onClick={closeDrawer}
            className={({ isActive }) =>
              `text-[15px] font-semibold px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-[#172AB4]/10 text-[#172AB4]"
                  : "text-[#090A0A] hover:bg-gray-100"
              }`
            }
          >
            {t("home")}
          </NavLink>
          <NavLink
            to="/services"
            onClick={closeDrawer}
            className={({ isActive }) =>
              `text-[15px] font-semibold px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-[#172AB4]/10 text-[#172AB4]"
                  : "text-[#090A0A] hover:bg-gray-100"
              }`
            }
          >
            {t("services")}
          </NavLink>
        </nav>

        {/* Add object */}
        <div className="px-4 pt-4">
          <button
            onClick={() => { setAddModalOpen(true); closeDrawer(); }}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-[#172AB4] hover:border-[#172AB4]/40 transition-colors"
          >
            <AddCircleIcon />
            {t("addObject")}
          </button>
        </div>

        {/* Bottom section */}
        <div className="mt-auto border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-3 px-1">
                <div className="w-9 h-9 rounded-full bg-[#172AB4]/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-[#172AB4]">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                </div>
              </div>
              {canAccessDashboard && (
                <Link
                  to="/dashboard"
                  onClick={closeDrawer}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <LayoutDashboard size={16} className="text-gray-400" />
                  {t("controlPanel")}
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut size={16} />
                {t("logout")}
              </button>
            </>
          ) : (
            <Link
              to="/oneid"
              onClick={closeDrawer}
              className="w-full text-center px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-800 hover:border-gray-400 transition-colors"
            >
              {t("loginLink")}
            </Link>
          )}

          <div className="flex gap-2 px-1">
            {LANGS.map((lang) => (
              <button
                key={lang.value}
                onClick={() => i18n.changeLanguage(lang.value)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  i18n.language === lang.value
                    ? "bg-[#172AB4] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {addModalOpen && (
        <CadastreModal onClose={() => setAddModalOpen(false)} />
      )}
    </>
  );
}
