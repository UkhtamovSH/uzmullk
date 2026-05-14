import { useState } from "react";
import MyApplicationsComp from "@/components/client/profile/MyApplications";

const MOCK_APPS = [
  { id: 1, title: "Kadastr pasportini olish",        status: "completed",  date: "12.04.2025" },
  { id: 2, title: "Obyektni cheklovga tekshirish",   status: "processing", date: "20.04.2025" },
  { id: 3, title: "Mulkni baholash jarayoni",        status: "new",        date: "02.05.2025" },
];

export default function MyApplicationsPage() {
  const [applications] = useState(MOCK_APPS);

  const handleView = (id) => {
    console.log("view application", id);
  };

  return (
    <MyApplicationsComp
      applications={applications}
      onView={handleView}
    />
  );
}
