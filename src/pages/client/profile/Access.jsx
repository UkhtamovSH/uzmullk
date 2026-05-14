import { useState } from "react";
import AccessComp from "@/components/client/profile/Access";

const MOCK_ACCESSES = [
  { id: 1, name: "Jasur Toshmatov",  cadastre: "17:13:10:01:05:6963", role: "Ko'ruvchi", grantedAt: "01.03.2025" },
  { id: 2, name: "Malika Yusupova",  cadastre: "17:14:02:03:08:1245", role: "Muharrir",  grantedAt: "15.04.2025" },
];

export default function AccessPage() {
  const [accesses, setAccesses] = useState(MOCK_ACCESSES);

  const handleRevoke = (id) => setAccesses((prev) => prev.filter((a) => a.id !== id));

  return (
    <AccessComp accesses={accesses} onRevoke={handleRevoke} />
  );
}
