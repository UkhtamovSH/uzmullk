import { useState } from "react";
import {
  NavLink,
  Outlet,
  Navigate,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AlertCircle,
  PenLine,
  Users,
  MapPin,
  HomeIcon,
  MessageSquare,
  KeyRound,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import useCardsStore from "@/store/useCardsStore";
import ArrowCircleLeftIcon from "@/assets/svg/ArrowCircleLeftIcon";
import ZapIcon from "@/assets/svg/ZapIcon";
import PassportFront from "@/assets/Front.png";

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
    <div
      className="relative rounded-xl overflow-hidden shadow-sm mx-auto"
      style={{
        width: "284px",
        height: "180px",
        backgroundImage: `url(${PassportFront})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* OBYEKT TURI value */}
      <div
        className="absolute"
        style={{ left: "8px", right: "45px", top: "60px" }}
      >
        <p
          className="font-semibold text-[#090A0A] leading-tight truncate"
          style={{ fontSize: "7px" }}
        >
          {card.propertyType ?? "—"}
        </p>
      </div>

      {/* KADASTR RAQAMI value */}
      <div
        className="absolute"
        style={{ left: "8px", right: "45px", top: "87px" }}
      >
        <p
          className="font-medium text-[#090A0A] truncate"
          style={{
            fontSize: "12px",
            fontFamily: "monospace",
            letterSpacing: "0.02em",
          }}
        >
          {card.cadastre ?? "—"}
        </p>
      </div>

      {/* MANZIL value */}
      <div
        className="absolute"
        style={{ left: "8px", right: "75px", top: "120px" }}
      >
        <p
          className="font-medium text-[#090A0A] leading-snug"
          style={{ fontSize: "7px" }}
        >
          {card.address ?? "—"}
        </p>
      </div>
    </div>
  );
}

/* ── Nav list ────────────────────────────────────────────────────────── */
function NavList({ basePath, debt, onClose }) {
  const { t } = useTranslation();

  const NAV_ITEMS = [
    { to: "payments", icon: ZapIcon, tKey: "propPayments", debt },
    { to: "info", icon: AlertCircle, tKey: "propInfo" },
    { to: "residents", icon: PenLine, tKey: "propResidents" },
    { to: "tenants", icon: Users, tKey: "propTenants" },
    { to: "map", icon: MapPin, tKey: "propMap" },
    { to: "services", icon: HomeIcon, tKey: "propServices" },
    { to: "requests", icon: MessageSquare, tKey: "propRequests" },
    { to: "access", icon: KeyRound, tKey: "propAccess" },
  ];

  return (
    <nav className="flex flex-col gap-0.5">
      {NAV_ITEMS.map(({ to, icon: Icon, tKey, debt: itemDebt }) => (
        <NavLink
          key={to}
          to={`${basePath}/${to}`}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all group ${
              isActive
                ? "bg-[#F0F4FF] text-[#172AB4]"
                : "text-[#4A4F68] hover:bg-gray-50 hover:text-[#172AB4]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                size={17}
                className={
                  isActive
                    ? "text-[#172AB4] shrink-0"
                    : "text-gray-400 group-hover:text-[#172AB4] shrink-0"
                }
              />
              <div className="flex-1 min-w-0">
                <span
                  className={`block truncate font-semibold ${isActive ? "text-[#172AB4]" : "text-[#4A4F68]"}`}
                >
                  {t(tKey)}
                </span>
                {itemDebt && (
                  <span className="block text-[11px] text-red-500 font-semibold mt-0.5">
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
        <div className="hidden md:flex flex-col w-[284px] shrink-0 bg-white border border-[#E2E5EE] rounded-2xl overflow-hidden sticky top-[90px]">
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
          className={`fixed top-0 left-0 h-full w-[284px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 md:hidden ${
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
