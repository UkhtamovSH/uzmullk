import { useState } from "react";
import { NavLink, Outlet, Navigate, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Zap, AlertCircle, PenLine, Users, MapPin,
  HomeIcon, MessageSquare, KeyRound,
  ArrowLeft, Menu, X,
} from "lucide-react";
import useCardsStore from "@/store/useCardsStore";

/* ── Mini passport (sidebar uchun) ──────────────────────────────────── */
function MiniPassport({ card }) {
  return (
    <div
      className="rounded-xl overflow-hidden relative shadow-sm border border-green-200"
      style={{
        background:
          "linear-gradient(135deg,#c8e6c9 0%,#a5d6a7 15%,#80cbc4 35%,#b2dfdb 55%,#c5e1a5 75%,#dcedc8 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,#006400 0,#006400 1px,transparent 1px,transparent 7px)," +
            "repeating-linear-gradient(-45deg,#006400 0,#006400 1px,transparent 1px,transparent 7px)",
        }}
      />
      <div className="relative p-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-[7px] font-semibold text-green-900/60 uppercase tracking-widest leading-tight">
              Ko'chmas mulk ob'yektining
            </p>
            <p className="text-[13px] font-black text-green-900 uppercase leading-tight tracking-wide">
              KADASTR PASPORTI
            </p>
          </div>
          <div className="shrink-0 w-8 h-6 rounded-[2px] overflow-hidden border border-green-700/20 flex flex-col">
            <div className="flex-1 bg-[#1DC7E0]" />
            <div className="h-[1px] bg-white" />
            <div className="flex-1 bg-white" />
            <div className="h-[1px] bg-white" />
            <div className="flex-1 bg-[#1AA01A]" />
          </div>
        </div>
        <div className="space-y-1">
          <div>
            <p className="text-[7px] text-green-800/50 uppercase font-bold tracking-widest">Obyekt turi</p>
            <p className="text-[10px] font-semibold text-green-900">{card.propertyType ?? "—"}</p>
          </div>
          <div>
            <p className="text-[7px] text-green-800/50 uppercase font-bold tracking-widest">Kadastr raqami</p>
            <p className="text-[12px] font-black text-green-900 tracking-widest" style={{ fontFamily: "monospace" }}>
              {card.cadastre ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-[7px] text-green-800/50 uppercase font-bold tracking-widest">Manzil</p>
            <p className="text-[9px] font-medium text-green-900 leading-snug">{card.address ?? "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Nav list ────────────────────────────────────────────────────────── */
function NavList({ basePath, debt, onClose }) {
  const { t } = useTranslation();

  const NAV_ITEMS = [
    { to: "payments",  icon: Zap,           tKey: "propPayments",  debt },
    { to: "info",      icon: AlertCircle,   tKey: "propInfo" },
    { to: "residents", icon: PenLine,       tKey: "propResidents" },
    { to: "tenants",   icon: Users,         tKey: "propTenants" },
    { to: "map",       icon: MapPin,        tKey: "propMap" },
    { to: "services",  icon: HomeIcon,      tKey: "propServices" },
    { to: "requests",  icon: MessageSquare, tKey: "propRequests" },
    { to: "access",    icon: KeyRound,      tKey: "propAccess" },
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
                <span className={`block truncate font-semibold ${isActive ? "text-[#172AB4]" : "text-[#4A4F68]"}`}>
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
  const card = useCardsStore((s) => s.getCard(id));
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!card) return <Navigate to="/profile/cards" replace />;

  const basePath = `/profile/cards/${id}`;
  const DEBT = "2 467 000";

  return (
    <div className="flex gap-6 items-start">

      {/* ════ DESKTOP: Chap sidebar ════ */}
      <div className="hidden md:flex flex-col w-[260px] shrink-0 bg-white border border-[#E2E5EE] rounded-2xl overflow-hidden sticky top-[90px]">
        <div className="p-4">
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
        className={`fixed top-0 left-0 h-full w-[290px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 md:hidden ${
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
          <NavList basePath={basePath} debt={DEBT} onClose={() => setDrawerOpen(false)} />
        </div>

        {/* Orqaga */}
        <div className="px-4 py-4 border-t border-[#E2E5EE]">
          <button
            onClick={() => { setDrawerOpen(false); navigate("/profile/cards"); }}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#172AB4] hover:bg-[#F0F4FF] transition-colors"
          >
            <ArrowLeft size={16} />
            {t("propBack")}
          </button>
        </div>
      </div>

      {/* ════ Asosiy kontent ════ */}
      <div className="flex-1 min-w-0 bg-white rounded-2xl border border-[#E2E5EE]">

        {/* Mobile top bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E2E5EE] md:hidden">
          <button
            onClick={() => navigate("/profile/cards")}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-[#090A0A] truncate">{card.propertyType}</p>
            <p className="text-[10px] text-gray-400 font-mono truncate">{card.cadastre}</p>
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
  );
}
