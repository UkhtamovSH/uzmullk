import { useState } from "react";
import PaymentHistoryComp from "@/components/client/profile/PaymentHistory";

const MOCK_PAYMENTS = [
  { id: 1, description: "Kadastr pasporti uchun to'lov", amount: 50000,  status: "success", date: "10.04.2025", type: "debit" },
  { id: 2, description: "Mulkni baholash xizmati",       amount: 120000, status: "success", date: "22.04.2025", type: "debit" },
  { id: 3, description: "Qaytarish: rad etilgan ariza",  amount: 50000,  status: "success", date: "28.04.2025", type: "credit" },
  { id: 4, description: "Ro'yxatdan o'tkazish xizmati",  amount: 80000,  status: "pending", date: "03.05.2025", type: "debit" },
];

export default function PaymentHistoryPage() {
  const [payments] = useState(MOCK_PAYMENTS);

  return (
    <PaymentHistoryComp payments={payments} />
  );
}
