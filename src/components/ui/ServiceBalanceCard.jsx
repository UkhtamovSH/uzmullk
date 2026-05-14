import { useTranslation } from "react-i18next";

function fmt(amount, currency) {
  return Math.abs(amount).toLocaleString("ru-RU") + " " + currency;
}

export default function ServiceBalanceCard({
  icon: Icon,
  iconGradient,   // "135deg, #FF8C42, #FF5200" — gradient string
  iconBg,         // oddiy rang (gradient yo'q bo'lsa)
  iconGlow,       // "rgba(255,100,0,0.35)" — soya rangi
  iconSize = 26,
  label,
  balance = 0,
  currency = "сум",
  balanceLabel,
  onClick,
}) {
  const { t } = useTranslation();
  const negative = balance < 0;
  const displayLabel = balanceLabel ?? t("balanceLabel");

  const iconStyle = {
    background: iconGradient
      ? `linear-gradient(${iconGradient})`
      : (iconBg ?? "#6B7280"),
    boxShadow: iconGlow ? `0 6px 20px ${iconGlow}` : undefined,
  };

  return (
    <div
      onClick={onClick}
      className={`flex flex-col justify-between p-5 bg-white rounded-2xl shadow-sm border border-gray-100 ${
        onClick ? "cursor-pointer hover:shadow-md" : ""
      } transition-shadow`}
      style={{ minHeight: 170 }}
    >
      {/* Yuqori: ikonka chap, balans o'ng */}
      <div className="flex items-start justify-between gap-2">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
          style={iconStyle}
        >
          {Icon && <Icon size={iconSize} className="text-white" strokeWidth={2} />}
        </div>
        <div className="text-right">
          <p className="text-[13px] text-gray-400 font-medium">{displayLabel}</p>
          <p className={`text-[16px] font-bold mt-0.5 leading-tight ${negative ? "text-red-500" : "text-[#090A0A]"}`}>
            {negative ? "−" : ""}{fmt(balance, currency)}
          </p>
        </div>
      </div>

      {/* Pastki: xizmat nomi */}
      <p className="text-[18px] font-bold text-[#090A0A] leading-snug mt-4">
        {label}
      </p>
    </div>
  );
}
