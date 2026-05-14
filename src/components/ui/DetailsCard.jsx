export default function DetailsCard({
  title,
  rows = [],
  bg = "#F8F9FB",
  className = "",
  titleClassName = "",
  rowClassName = "",
  valueClassName = "",
}) {
  return (
    <div
      className={`rounded-[28px] px-5 pt-4 pb-2 ${className}`}
      style={{ background: bg }}
    >
      {title && (
        <h3 className={`text-[17px] font-bold text-[#090A0A] mb-3 ${titleClassName}`}>
          {title}
        </h3>
      )}

      <div>
        {rows.map((row, index) => (
          <div
            key={index}
            className={`flex items-start justify-between gap-4 py-3 ${rowClassName}`}
          >
            <p className="text-[13px] text-gray-400 leading-snug flex-1">
              {row.label}
            </p>

            <p
              className={`text-[14px] text-[#090A0A] shrink-0 text-right leading-snug ${
                row.bold !== false ? "font-bold" : "font-semibold"
              } ${row.mono ? "font-mono tracking-tight" : ""} ${valueClassName}`}
            >
              {row.value ?? "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
