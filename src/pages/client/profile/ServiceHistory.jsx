import { useState } from "react";
import ServiceHistoryComp from "@/components/client/profile/ServiceHistory";

const MOCK_SERVICES = [
  { id: 1, name: "Kadastr pasportini olish",       status: "completed", date: "10.04.2025", result: true },
  { id: 2, name: "Obyektni cheklovga tekshirish",  status: "completed", date: "18.04.2025", result: true },
  { id: 3, name: "Mulkni baholash jarayoni",       status: "active",    date: "02.05.2025", result: false },
  { id: 4, name: "Ijara shartnomasini tuzish",     status: "pending",   date: "07.05.2025", result: false },
];

export default function ServiceHistoryPage() {
  const [services] = useState(MOCK_SERVICES);

  const handleDownload = (id) => {
    console.log("download service result", id);
  };

  return (
    <ServiceHistoryComp services={services} onDownload={handleDownload} />
  );
}
