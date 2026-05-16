import { useTranslation } from "react-i18next";
import CloseCircleIcon from "@/assets/svg/CloseCircleIcon";

const STATUS_COLOR = {
  paid:       "#1FBA66",
  processing: "#0076FE",
  failed:     "#EF4444",
};

const STATUS_TKEY = {
  paid:       "payStatusPaid",
  processing: "payStatusProcessing",
  failed:     "payStatusFailed",
};

function Row({ label, value, valueColor }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-[#F8FAFC] rounded-xl px-4 py-3">
      <span className="text-[13px] font-medium text-[#475569]">{label}</span>
      <span
        className="text-[14px] font-bold text-right"
        style={{ color: valueColor || "#090A0A" }}
      >
        {value}
      </span>
    </div>
  );
}

export default function PaymentDetailModal({ item, onClose }) {
  const { t } = useTranslation();

  if (!item) return null;

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const title = item.titleKey ? t(item.titleKey) : item.title;
  const statusColor = STATUS_COLOR[item.status] ?? STATUS_COLOR.paid;
  const statusText = t(STATUS_TKEY[item.status] ?? "payStatusPaid");
  const amountText =
    typeof item.amount === "number"
      ? `${item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${t("currencyUZS")}`
      : item.amount;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={handleBackdrop}
    >
      <div
        className="w-full max-w-[440px] bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: "0px 10px 40px 0px #00000026" }}
      >
        <div className="flex items-center justify-between px-6 pt-5">
          <h2 className="text-[18px] font-bold text-[#090A0A]">
            {t("aboutService")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#CBD5E1] hover:text-[#172AB4] transition-colors"
            aria-label="close"
          >
            <CloseCircleIcon />
          </button>
        </div>

        <div className="px-6 pt-5 pb-6 flex flex-col gap-2">
          <Row label={t("rowServiceName")} value={title} />
          <Row label={t("rowPaymentTime")} value={item.time} />
          <Row label={t("rowPaymentDate")} value={item.date} />
          <Row label={t("rowAmount")} value={amountText} />
          <Row label={t("rowStatus")} value={statusText} valueColor={statusColor} />

          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full h-[52px] rounded-xl text-[15px] font-semibold text-white hover:opacity-90 transition-opacity"
            style={{
              background:
                "linear-gradient(94.21deg, #00A5FE 10.94%, #0076FE 58.07%)",
            }}
          >
            {t("btnClose")}
          </button>
        </div>
      </div>
    </div>
  );
}
