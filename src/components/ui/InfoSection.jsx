/**
 * Universal ma'lumot bo'limi komponenti.
 *
 * Props:
 *  title   — bo'lim sarlavhasi (string)
 *  rows    — [{ label: string, value: string|node, mono?: bool, bold?: bool }]
 *  bg      — karta fon rangi, default "white"
 *  className — qo'shimcha class (ixtiyoriy)
 */
export default function InfoSection({ title, rows = [], bg = "white", className = "" }) {
  return (
    <div
      className={`rounded-2xl px-5 pt-4 pb-2 ${className}`}
      style={{ background: bg }}
    >
      {title && (
        <h3 className="text-[17px] font-bold text-[#090A0A] mb-3">{title}</h3>
      )}
      <div>
        {rows.map((row, i) => (
          <div
            key={i}
            className={`flex items-start justify-between gap-4 py-3 ${
              i < rows.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <p className="text-[13px] text-gray-400 leading-snug flex-1">{row.label}</p>
            <p
              className={`text-[14px] text-[#090A0A] shrink-0 text-right leading-snug ${
                row.bold !== false ? "font-bold" : "font-semibold"
              } ${row.mono ? "font-mono tracking-tight" : ""}`}
            >
              {row.value ?? "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
