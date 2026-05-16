import { X, ChevronRight, AlertCircle } from "lucide-react";
import { useState } from "react";
import PassportPreview from "./PassportPreview";

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
    <PassportPreview
      card={data}
      className="mx-4 mt-4 rounded-2xl shadow-lg shrink-0"
    />
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
