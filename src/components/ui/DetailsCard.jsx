export default function DetailsCard({
  title,
  rows = [],
  bg = "#F8FAFC",
  className = "",
  titleClassName = "",
}) {
  return (
    <div
      className={`rounded-[18px] p-4 ${className}`}
      style={{ background: bg }}
    >
      {title && (
        <h3
          className={`text-[20px] font-semibold text-[#090A0A] mb-3 ${titleClassName}`}
        >
          {title}
        </h3>
      )}

      <div className="space-y-[24.5px]">
        {rows.map((row, index) => (
          <div key={index} className={`flex items-start justify-between gap-4`}>
            <p className="text-[14px] text-[#475569] font-medium leading-snug flex-1">
              {row.label}
            </p>

            <p
              className={`text-[16px] text-[#090A0A] shrink-0 text-right font-semibold leading-snug`}
            >
              {row.value ?? "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
