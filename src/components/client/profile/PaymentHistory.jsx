import { useState } from "react";
import { useTranslation } from "react-i18next";
import DocTextIcon from "@/assets/svg/DocTextIcon";
import PaymentDetailModal from "./PaymentDetailModal";
import timeeImg from "@/assets/timee.png";

const STATUS_STYLES = {
  paid: { color: "#1FBA66", tKey: "payStatusPaid" },
  processing: { color: "#0076FE", tKey: "payStatusProcessing" },
  failed: { color: "#EF4444", tKey: "payStatusFailed" },
};

function formatAmount(value, currencyLabel) {
  const n = Number(value) || 0;
  const formatted = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formatted} ${currencyLabel}`;
}

function PaymentCard({ item, t, onClick }) {
  const status = STATUS_STYLES[item.status] ?? STATUS_STYLES.paid;
  const title = item.titleKey ? t(item.titleKey) : item.title;
  const amount = formatAmount(item.amount, t("currencyUZS"));

  return (
    <div
      onClick={() => onClick?.(item)}
      className="bg-[#F8FAFC] rounded-2xl p-4 flex flex-col gap-3 cursor-pointer hover:bg-[#F1F5F9] transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <DocTextIcon />
        <div className="text-right">
          <div className="text-[13px] font-medium text-[#475569] whitespace-nowrap">
            <span>{item.date}</span>
            <span className="ml-3">{item.time}</span>
          </div>
          <div
            className="text-[13px] font-semibold mt-0.5"
            style={{ color: status.color }}
          >
            {t(status.tKey)}
          </div>
        </div>
      </div>

      <div>
        <div className="text-[14px] font-medium text-[#475569] truncate">
          {title}
        </div>
        <div className="text-[16px] font-bold text-[#090A0A] mt-0.5">
          {amount}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ title, desc }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <img
        src={timeeImg}
        alt=""
        className="w-[226px] h-[226px] object-contain select-none"
        draggable="false"
      />
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-[18px] font-semibold text-[#090A0A] text-center">
          {title}
        </h3>
        <p className="text-[15px] font-semibold text-[#475569] text-center">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function PaymentHistory({ payments = [] }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);

  if (payments.length == 0) {
    return (
      <EmptyState
        title={t("emptyPaymentsTitle")}
        desc={t("emptyPaymentsDesc")}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {payments.map((p) => (
          <PaymentCard key={p.id} item={p} t={t} onClick={setSelected} />
        ))}
      </div>

      {selected && (
        <PaymentDetailModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
