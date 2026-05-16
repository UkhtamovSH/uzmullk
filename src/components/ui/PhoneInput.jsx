export function formatPhone(raw) {
  if (raw.length <= 2) return raw;
  if (raw.length <= 5) return `${raw.slice(0, 2)} ${raw.slice(2)}`;
  if (raw.length <= 7)
    return `${raw.slice(0, 2)} ${raw.slice(2, 5)} ${raw.slice(5)}`;
  return `${raw.slice(0, 2)} ${raw.slice(2, 5)} ${raw.slice(5, 7)} ${raw.slice(7)}`;
}

export default function PhoneInput({
  value,
  onChange,
  disabled,
  placeholder,
  autoFocus = false,
}) {
  return (
    <div
      className={`flex items-center rounded-xl border transition-all ${
        disabled
          ? "border-gray-200 bg-gray-50"
          : "border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15"
      }`}
    >
      <span className="px-4 py-3.5 text-sm font-medium text-gray-600 border-r border-gray-200 select-none whitespace-nowrap">
        +998
      </span>
      <input
        type="tel"
        value={formatPhone(value)}
        onChange={(e) => {
          let raw = e.target.value.replace(/\D/g, "");
          if (raw.startsWith("998") && raw.length > 9) raw = raw.slice(3);
          onChange(raw.slice(0, 9));
        }}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className="flex-1 px-4 py-3.5 text-sm text-gray-900 bg-transparent outline-none placeholder:text-gray-400 disabled:opacity-60"
      />
    </div>
  );
}
