import { useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Users } from "lucide-react";
import DetailsCard from "@/components/ui/DetailsCard";

const MOCK_TENANTS = [
  { id: 1, name: "Madaminova Barno Begzodovna", birthDate: "12.10.1998", regDate: "12.10.1999", regType: "permanent", pinfl: "123456789098765" },
  { id: 2, name: "Ivanov Aleksey Sergeevich",   birthDate: "05.03.1995", regDate: "15.04.2010", regType: "permanent", pinfl: "123456789098765" },
];

function PersonCard({ person }) {
  const { t } = useTranslation();
  const rows = [
    { label: t("birthDate"), value: person.birthDate },
    { label: t("regDate"),   value: person.regDate },
    { label: t("regType"),   value: t(person.regType) },
    { label: t("pinfl"),     value: person.pinfl, mono: true },
  ];

  return <DetailsCard title={person.name} rows={rows} bg="#F8F9FB" />;
}

export default function Tenants() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useOutletContext();

  return (
    <div className="px-4 sm:px-6 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/profile/cards")}
          className="hidden md:flex w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 items-center justify-center transition-colors shrink-0"
        >
          <ArrowLeft size={18} className="text-gray-600" strokeWidth={2.5} />
        </button>
        <h2 className="text-[22px] font-bold text-[#090A0A]">{t("tenantsTitle")}</h2>
        <Users size={18} className="text-gray-300" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOCK_TENANTS.map((p) => (
          <PersonCard key={p.id} person={p} />
        ))}
      </div>
    </div>
  );
}
