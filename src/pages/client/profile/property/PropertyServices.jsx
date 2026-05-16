import { useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ZapIcon from "@/assets/svg/ZapIcon";
import HomeIcon from "@/assets/svg/HomeIcon";
import DropletsIcon from "@/assets/svg/DropletsIcon";
import FlameIcon from "@/assets/svg/FlameIcon";
import ThermometerIcon from "@/assets/svg/ThermometerIcon";
import RecycleIcon from "@/assets/svg/RecycleIcon";
import CoinsIcon from "@/assets/svg/CoinsIcon";
import Building2Icon from "@/assets/svg/Building2Icon";
import ServiceBalanceCard from "@/components/ui/ServiceBalanceCard";

const SERVICES = [
  {
    id: 1,
    tKey: "electricity",
    Icon: ZapIcon,
    balance: -10000,
  },
  {
    id: 2,
    tKey: "propertyTax",
    Icon: HomeIcon,
    balance: -98000,
  },
  {
    id: 3,
    tKey: "drinkingWater",
    Icon: DropletsIcon,
    balance: 2398000,
  },
  {
    id: 4,
    tKey: "naturalGas",
    Icon: FlameIcon,
    balance: 2398000,
  },
  {
    id: 5,
    tKey: "hotWater",
    Icon: ThermometerIcon,
    balance: 2398000,
  },
  {
    id: 6,
    tKey: "wasteDisposal",
    Icon: RecycleIcon,
    balance: -200,
  },
  {
    id: 7,
    tKey: "landTax",
    Icon: CoinsIcon,
    balance: 2398000,
  },
  {
    id: 8,
    tKey: "myHome",
    Icon: Building2Icon,
    balance: 2398000,
  },
];

export default function PropertyServices() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useOutletContext();

  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {SERVICES.map((service) => (
          <ServiceBalanceCard
            key={service.id}
            icon={service.Icon}
            label={t(service.tKey)}
            balance={service.balance}
          />
        ))}
      </div>
    </div>
  );
}
