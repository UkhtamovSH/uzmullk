import PaymentHistoryComp from "@/components/client/profile/PaymentHistory";

const MOCK_PAYMENTS = [
  {
    id: 1,
    date: "14.01.2026",
    time: "12:23",
    status: "paid",
    titleKey: "servicePropertyHistory",
    amount: 200000,
  },
  {
    id: 2,
    date: "14.01.2026",
    time: "12:23",
    status: "processing",
    titleKey: "servicePropertyHistory",
    amount: 200000,
  },
  {
    id: 3,
    date: "14.01.2026",
    time: "12:23",
    status: "failed",
    titleKey: "servicePropertyHistory",
    amount: 200000,
  },
];

export default function PaymentHistoryPage() {
  return <PaymentHistoryComp payments={MOCK_PAYMENTS} />;
}
