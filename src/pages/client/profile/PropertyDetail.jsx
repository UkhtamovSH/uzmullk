import { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  Navigate,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Menu, X } from "lucide-react";
import useCardsStore from "@/store/useCardsStore";
import ArrowCircleLeftIcon from "@/assets/svg/ArrowCircleLeftIcon";
import FlashIcon from "@/assets/svg/FlashIcon";
import InfoCircleIcon from "@/assets/svg/InfoCircleIcon";
import EdiSideIcon from "@/assets/svg/EdiSideIcon";
import ProfileUserIcon from "@/assets/svg/ProfileUserIcon";
import LocationIcon from "@/assets/svg/LocationIcon";
import SafeHomeIcon from "@/assets/svg/SafeHomeIcon";
import HomeSideIcon from "@/assets/svg/HomeSideIcon";
import KeySquareIcon from "@/assets/svg/KeySquareIcon";
import PassportPreview from "@/components/client/profile/PassportPreview";

/* ── Har bir sahifa uchun sarlavha konfiguratsiyasi ─────────────────── */
const HEADER_CONFIG = {
  payments: { tKey: "propPayments" },
  info: { tKey: "plotInfoTitle" },
  residents: { tKey: "residentsTitle" },
  tenants: { tKey: "tenantsTitle" },
  map: { tKey: "propMap" },
  services: { tKey: "propServices" },
  requests: { tKey: "propRequests" },
  access: { tKey: "propAccess" },
};

function SectionHeader({ tKey }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goBack = () => navigate("/profile/cards");
  return (
    <div className="bg-white border border-[#E4E7EC] rounded-[20px] p-[34px] mb-5 flex items-center gap-2">
      <div
        className="inline-flex items-center gap-2 cursor-pointer"
        onClick={goBack}
      >
        <div className="text-[#000] hover:text-gray-700 transition-colors">
          <ArrowCircleLeftIcon />
        </div>
        <span className="text-sm text-gray-500">{t(tKey)}</span>
      </div>
    </div>
  );
}

/* ── Mini passport (sidebar uchun) ──────────────────────────────────── */
function MiniPassport({ card }) {
  return (
    <PassportPreview
      card={card}
      className="rounded-xl shadow-sm mx-auto"
      style={{ width: "284px" }}
    />
  );
}

/* ── Nav list ────────────────────────────────────────────────────────── */
function NavList({ basePath, debt, onClose }) {
  const { t } = useTranslation();

  const NAV_ITEMS = [
    { to: "payments", icon: FlashIcon, tKey: "propPayments", debt },
    { to: "info", icon: InfoCircleIcon, tKey: "propInfo" },
    { to: "residents", icon: EdiSideIcon, tKey: "propResidents" },
    { to: "tenants", icon: ProfileUserIcon, tKey: "propTenants" },
    { to: "map", icon: LocationIcon, tKey: "propMap" },
    { to: "services", icon: SafeHomeIcon, tKey: "propServices" },
    { to: "requests", icon: HomeSideIcon, tKey: "propRequests" },
    { to: "access", icon: KeySquareIcon, tKey: "propAccess" },
  ];

  return (
    <nav className="flex flex-col gap-0.5">
      {NAV_ITEMS.map(({ to, icon: Icon, tKey, debt: itemDebt }) => (
        <NavLink
          key={to}
          to={`${basePath}/${to}`}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-2.5 p-2.5 rounded-xl text-[14px] transition-all group ${
              isActive
                ? "bg-[#F1F5F9] text-[#18181B]"
                : "text-[#18181B] hover:bg-[#F1F5F9]"
            }`
          }
        >
          {() => (
            <>
              <Icon size={20} className="text-[#18181B] shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="block truncate font-semibold text-[14px] text-[#18181B]">
                  {t(tKey)}
                </span>
                {itemDebt && (
                  <span className="block text-[12px] text-[#FF2F2F] font-semibold mt-0.5">
                    {t("propDebt")}: {itemDebt}
                  </span>
                )}
              </div>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

/* ── Asosiy layout ───────────────────────────────────────────────────── */
export default function PropertyDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const card = useCardsStore((s) => s.getCard(id));
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  if (!card) return <Navigate to="/profile/cards" replace />;

  const basePath = `/profile/cards/${id}`;
  const DEBT = "2 467 000";
  const segment = location.pathname.split("/").pop();
  const headerConfig = HEADER_CONFIG[segment];

  return (
    <>
      {headerConfig && <SectionHeader {...headerConfig} />}
      <div className="flex gap-[21px] items-start">
        {/* ════ DESKTOP: Chap sidebar ════ */}
        <div className="hidden md:flex flex-col w-[284px] shrink-0 bg-white border border-[#E2E5EE] rounded-2xl overflow-hidden sticky top-[120px]">
          <div>
            <MiniPassport card={card} />
          </div>
          <div className="mx-4 h-px bg-[#E2E5EE]" />
          <div className="px-3 py-3">
            <NavList basePath={basePath} debt={DEBT} />
          </div>
        </div>

        {/* ════ MOBILE: Drawer overlay ════ */}
        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* ════ MOBILE: Drawer panel ════ */}
        <div
          className={`fixed top-0 left-0 h-full w-[315px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 md:hidden ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-[#E2E5EE]">
            <p className="text-[14px] font-bold text-[#090A0A] truncate flex-1 mr-3">
              {card.propertyType}
            </p>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Mini passport */}
          <div className="px-4 py-3">
            <MiniPassport card={card} />
          </div>

          <div className="mx-4 h-px bg-[#E2E5EE]" />

          {/* Nav */}
          <div className="flex-1 overflow-y-auto px-3 py-3">
            <NavList
              basePath={basePath}
              debt={DEBT}
              onClose={() => setDrawerOpen(false)}
            />
          </div>

          {/* Orqaga */}
          <div className="px-4 py-4 border-t border-[#E2E5EE]">
            <button
              onClick={() => {
                setDrawerOpen(false);
                navigate("/profile/cards");
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#172AB4] hover:bg-[#F0F4FF] transition-colors"
            >
              <ArrowLeft size={16} />
              {t("propBack")}
            </button>
          </div>
        </div>

        {/* ════ Asosiy kontent ════ */}
        <div className="flex-1 min-w-0">
          {/* Mobile top bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E2E5EE] md:hidden">
            <button
              onClick={() => navigate("/profile/cards")}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
            >
              <ArrowLeft size={20} strokeWidth={2.5} />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-[#090A0A] truncate">
                {card.propertyType}
              </p>
              <p className="text-[10px] text-gray-400 font-mono truncate">
                {card.cadastre}
              </p>
            </div>
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Menu size={18} className="text-gray-600" />
            </button>
          </div>

          <Outlet context={{ card }} />
        </div>
      </div>
    </>
  );
}
