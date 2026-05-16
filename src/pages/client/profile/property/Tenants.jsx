import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DetailsCard from "@/components/ui/DetailsCard";

const MOCK_TENANTS = [
  {
    id: 1,
    name: "Madaminova Barno Begzodovna",
    birthDate: "12.10.1998",
    regDate: "12.10.1999",
    regType: "permanent",
    pinfl: "123456789098765",
  },
  {
    id: 2,
    name: "Ivanov Aleksey Sergeevich",
    birthDate: "05.03.1995",
    regDate: "15.04.2010",
    regType: "permanent",
    pinfl: "123456789098765",
  },
];

function PersonCard({ person }) {
  const { t } = useTranslation();
  const rows = [
    { label: t("birthDate"), value: person.birthDate },
    { label: t("regDate"), value: person.regDate },
    { label: t("regType"), value: t(person.regType) },
    { label: t("pinfl"), value: person.pinfl, mono: true },
  ];

  return <DetailsCard title={person.name} rows={rows} bg="#F8F9FB" />;
}

export default function Tenants() {
  useOutletContext();

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOCK_TENANTS.map((p) => (
          <PersonCard key={p.id} person={p} />
        ))}
      </div>
    </div>
  );
}
