import { useTranslation } from "react-i18next";

function fmt(amount, currency) {
  return Math.abs(amount).toLocaleString("ru-RU") + " " + currency;
}

export default function ServiceBalanceCard({
  icon: Icon,
  label,
  balance = 0,
  currency = "сум",
  balanceLabel,
}) {
  const { t } = useTranslation();
  const negative = balance < 0;
  const displayLabel = balanceLabel ?? t("balanceLabel");

  return (
    <div
      className={`flex flex-col justify-between p-5 bg-[#F8FAFC] rounded-[18px] shadow-sm transition-shadow`}
    >
      {/* Yuqori: ikonka chap, balans o'ng */}
      <div className="flex items-start justify-between gap-2">
        <div className="shrink-0">{Icon && <Icon />}</div>
        <div className="text-right">
          <p className="text-[16px] text-[#090A0A] font-semibold">
            {displayLabel}
          </p>
          <p
            className={`text-[16px] font-semibold ${negative ? "text-[#FF2F2F]" : "text-[#090A0A]"}`}
          >
            {negative ? "−" : ""}
            {fmt(balance, currency)}
          </p>
        </div>
      </div>

      {/* Pastki: xizmat nomi */}
      <p className="text-[20px] font-bold text-[#090A0A] leading-snug mt-4">
        {label}
      </p>
    </div>
  );
}
