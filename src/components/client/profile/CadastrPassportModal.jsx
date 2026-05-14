import { X, ChevronRight, AlertCircle } from "lucide-react";
import { useState } from "react";

const DETAIL_ROWS = [
  { label: "Umumiy yer uchastkasi maydoni (m²)",        key: "totalArea" },
  { label: "Haqiqiy yer uchastkasi maydoni",            key: "actualArea" },
  { label: "Qurilish ostidagi yer",                     key: "buildArea" },
  { label: "Yer uchastkasidan foydalanish uchun qulay", key: "usableArea" },
  { label: "Yer uchastkasini egallash maydoni",         key: "captureArea" },
  { label: "Hovli ostidagi yer maydoni",                key: "yardArea" },
  { label: "Binoning yashash maydoni",                  key: "livingArea" },
  { label: "Binoning foydali maydoni",                  key: "usefulArea" },
];

const EXTRA_ROWS = [
  { label: "Qavatlar soni",  key: "floors" },
  { label: "Xonalar soni",   key: "rooms" },
  { label: "Qurilish yili",  key: "builtYear" },
];

function PassportCard({ data }) {
  return (
    <div
      className="mx-4 mt-4 rounded-2xl overflow-hidden shadow-lg relative"
      style={{
        background: "linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 20%, #80cbc4 40%, #b2dfdb 60%, #c5e1a5 80%, #dcedc8 100%)",
        minHeight: 180,
      }}
    >
      {/* Security pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #006400 0px, #006400 1px, transparent 1px, transparent 8px), repeating-linear-gradient(-45deg, #006400 0px, #006400 1px, transparent 1px, transparent 8px)",
        }}
      />

      {/* Header strip */}
      <div className="relative flex items-start justify-between px-4 pt-3 pb-1">
        <div className="flex-1">
          <p className="text-[9px] font-semibold text-green-900 leading-tight uppercase tracking-widest">
            Ko'chmas mulk ob'yektining
          </p>
          <p
            className="text-[18px] font-black uppercase text-green-900 leading-tight tracking-wide"
            style={{ textShadow: "0 1px 2px rgba(0,100,0,0.2)" }}
          >
            KADASTR PASPORTI
          </p>
        </div>
        {/* Flag */}
        <div className="flex flex-col items-center ml-3 shrink-0">
          <div className="w-10 h-7 rounded-sm overflow-hidden border border-green-700/30 shadow-sm flex flex-col">
            <div className="flex-1 bg-[#1DC7E0]" />
            <div className="h-px bg-white" />
            <div className="flex-1 bg-white" />
            <div className="h-px bg-white" />
            <div className="flex-1 bg-[#1AA01A]" />
          </div>
          <span className="text-[8px] font-bold text-green-900 mt-0.5">UZ</span>
        </div>
      </div>

      {/* Divider line */}
      <div className="mx-4 h-px bg-green-800/20 mb-2" />

      {/* Fields */}
      <div className="relative px-4 pb-3 space-y-2">
        <div>
          <p className="text-[8px] font-bold text-green-800/60 uppercase tracking-widest">
            Obyekt turi
          </p>
          <p className="text-[11px] font-semibold text-green-900 leading-tight">
            {data.propertyType ?? "Turar joy"}
          </p>
        </div>

        <div>
          <p className="text-[8px] font-bold text-green-800/60 uppercase tracking-widest">
            Kadastr raqami
          </p>
          <p
            className="text-[15px] font-black text-green-900 tracking-widest leading-tight"
            style={{ fontFamily: "monospace" }}
          >
            {data.cadastre ?? "—"}
          </p>
        </div>

        <div>
          <p className="text-[8px] font-bold text-green-800/60 uppercase tracking-widest">
            Manzil
          </p>
          <p className="text-[10px] font-medium text-green-900 leading-snug">
            {data.address ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CadastrPassportModal({ data = {}, onClose, onSave }) {
  const [showAll, setShowAll] = useState(false);

  const visibleRows = showAll ? [...DETAIL_ROWS, ...EXTRA_ROWS] : DETAIL_ROWS;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 px-0 py-0 sm:px-6 sm:py-6"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className="w-full sm:max-w-[400px] h-full sm:h-auto sm:max-h-[92vh] bg-white sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}
      >
        {/* Close */}
        <div className="flex items-center justify-end px-4 pt-4 shrink-0">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Passport card */}
        <PassportCard data={data} />

        {/* Status badge */}
        <div className="px-4 mt-3 shrink-0">
          <span
            className={`inline-block w-full text-center text-[11px] font-black tracking-widest uppercase py-2 rounded-lg border ${
              data.isActive
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-gray-50 text-gray-400 border-gray-200"
            }`}
          >
            {data.isActive ? "FAOL" : "NOFAOL"}
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-4">
            <p className="text-[13px] font-bold text-[#090A0A] mb-3">
              Yer uchastkasi bo'yicha
            </p>

            {/* Address block */}
            <div className="mb-3 flex gap-3">
              <p className="text-xs text-gray-500 w-20 shrink-0 leading-snug">Manzil:</p>
              <p className="text-[12px] font-semibold text-[#090A0A] leading-snug text-right flex-1">
                {data.address ?? "—"}
              </p>
            </div>

            <div className="h-px bg-[#F1F5F9] mb-1" />

            {/* Detail rows */}
            <div className="flex flex-col">
              {visibleRows.map(({ label, key }) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2.5 border-b border-[#F1F5F9] last:border-0"
                >
                  <p className="text-xs text-gray-500 leading-snug pr-3 flex-1">{label}</p>
                  <p className="text-sm font-bold text-[#090A0A] shrink-0">
                    {data[key] ?? 0}
                  </p>
                </div>
              ))}
            </div>

            {/* Show all toggle */}
            <button
              onClick={() => setShowAll((v) => !v)}
              className="w-full flex items-center justify-between mt-2 py-3 border-t border-[#F1F5F9] text-[#090A0A] font-semibold text-sm"
            >
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-[#172AB4]" />
                <span>Barcha ma'lumot</span>
              </div>
              <ChevronRight
                size={16}
                className={`text-gray-400 transition-transform ${showAll ? "rotate-90" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="px-4 py-4 shrink-0">
          <button
            onClick={() => onSave?.(data)}
            className="w-full h-12 rounded-xl bg-[#172AB4] hover:bg-[#1322A0] text-white text-sm font-bold transition-colors"
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}
