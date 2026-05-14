import { useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Zap, Home, Droplets, Flame, Thermometer,
  Recycle, Coins, Building2, ArrowLeft, Briefcase,
} from "lucide-react";
import ServiceBalanceCard from "@/components/ui/ServiceBalanceCard";

const SERVICES = [
  {
    id: 1, tKey: "electricity", Icon: Zap,
    iconGradient: "145deg, #FF9A3C, #FF5200",
    iconGlow: "rgba(255,90,0,0.35)",
    balance: -10000,
  },
  {
    id: 2, tKey: "propertyTax", Icon: Home,
    iconGradient: "145deg, #34D399, #059669",
    iconGlow: "rgba(5,150,105,0.35)",
    balance: -98000,
  },
  {
    id: 3, tKey: "drinkingWater", Icon: Droplets,
    iconGradient: "145deg, #60C8F5, #2196F3",
    iconGlow: "rgba(33,150,243,0.35)",
    balance: 2398000,
  },
  {
    id: 4, tKey: "naturalGas", Icon: Flame,
    iconGradient: "145deg, #5B9EF5, #1565C0",
    iconGlow: "rgba(21,101,192,0.35)",
    balance: 2398000,
  },
  {
    id: 5, tKey: "hotWater", Icon: Thermometer,
    iconGradient: "145deg, #FF6B6B, #D32F2F",
    iconGlow: "rgba(211,47,47,0.35)",
    balance: 2398000,
  },
  {
    id: 6, tKey: "wasteDisposal", Icon: Recycle,
    iconGradient: "145deg, #4CAF50, #1B5E20",
    iconGlow: "rgba(27,94,32,0.35)",
    balance: -200,
  },
  {
    id: 7, tKey: "landTax", Icon: Coins,
    iconGradient: "145deg, #FFBB55, #F57C00",
    iconGlow: "rgba(245,124,0,0.35)",
    balance: 2398000,
  },
  {
    id: 8, tKey: "myHome", Icon: Building2,
    iconGradient: "145deg, #5C7FE8, #1A3BB5",
    iconGlow: "rgba(26,59,181,0.35)",
    balance: 2398000,
  },
];

export default function PropertyServices() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useOutletContext();

  return (
    <div className="px-4 sm:px-6 py-6">
      <div className="flex items-center gap-3 mb-7">
        <button
          onClick={() => navigate("/profile/cards")}
          className="hidden md:flex w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 items-center justify-center transition-colors shrink-0"
        >
          <ArrowLeft size={18} className="text-gray-600" strokeWidth={2.5} />
        </button>
        <h2 className="text-[22px] font-bold text-[#090A0A]">{t("propServices")}</h2>
        <Briefcase size={18} className="text-gray-300" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {SERVICES.map((service) => (
          <ServiceBalanceCard
            key={service.id}
            icon={service.Icon}
            iconGradient={service.iconGradient}
            iconGlow={service.iconGlow}
            label={t(service.tKey)}
            balance={service.balance}
            onClick={() => navigate(`/services/${service.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
