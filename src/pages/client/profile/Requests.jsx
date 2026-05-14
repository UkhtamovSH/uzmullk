import { useState } from "react";
import RequestsComp from "@/components/client/profile/Requests";

const MOCK_REQUESTS = [
  { id: 1, description: "Qayta ro'yxatdan o'tish haqida savol",  status: "answered",   date: "10.04.2025" },
  { id: 2, description: "Xizmat ko'rsatish muddati haqida",      status: "processing", date: "25.04.2025" },
  { id: 3, description: "To'lov qaytarilishi bo'yicha murojaat", status: "open",       date: "05.05.2025" },
];

export default function RequestsPage() {
  const [requests] = useState(MOCK_REQUESTS);

  const handleView = (id) => {
    console.log("view request", id);
  };

  return (
    <RequestsComp requests={requests} onView={handleView} />
  );
}
