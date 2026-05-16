import { useState } from "react";
import AddCircleIcon from "@/assets/svg/AddCircleIcon";
import PassportPreview from "./PassportPreview";

/* ── Katta passport karta ────────────────────────────────────────────── */
function PassportCardFull({ card, onClick }) {
  const isRestricted = card.status === "taqiq";

  return (
    <div
      onClick={() => onClick?.(card)}
      className="rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow border border-[#E2E5EE] relative select-none bg-white"
    >
      <PassportPreview card={card} />

      {isRestricted && (
        <div className="bg-red-500 py-2.5 text-center">
          <span className="text-white text-[12px] font-black uppercase tracking-widest">
            Taqiq
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Bo'sh holat ─────────────────────────────────────────────────────── */
function EmptyState() {
  return (
    <div className="py-16 flex flex-col items-center gap-4 text-center">
      <div className="relative w-[120px] h-[80px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#172AB4] to-[#2D4ED8] rounded-xl opacity-20 rotate-6" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#172AB4] to-[#2D4ED8] rounded-xl opacity-40 rotate-3" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#172AB4] to-[#2D4ED8] rounded-xl flex items-center justify-center">
          <div className="space-y-1.5 px-3 w-full">
            <div className="h-1.5 bg-white/30 rounded-full w-3/4" />
            <div className="h-1.5 bg-white/20 rounded-full w-full" />
            <div className="h-1.5 bg-white/20 rounded-full w-2/3" />
          </div>
        </div>
      </div>
      <div>
        <p className="text-[14px] font-semibold text-[#090A0A]">
          Hali kadastr kartasi qo'shilmagan
        </p>
        <p className="text-xs text-gray-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
          Ma'lumot olish uchun kadastr kartasini qo'shishingiz kerak
        </p>
      </div>
    </div>
  );
}

/* ── Asosiy komponent ────────────────────────────────────────────────── */
const TABS = [
  { key: "my",  label: "Mening mulklarim" },
  { key: "all", label: "Barcha mulklar" },
];

export default function MyCards({
  cards = [],
  onAddCard,
  onSelectCard,
  loading = false,
}) {
  const [activeTab, setActiveTab] = useState("my");

  return (
    <div className="bg-white rounded-2xl border border-[#E2E5EE] overflow-hidden">

      {/* ── Sarlavha ── */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-6 py-5 border-b border-[#E2E5EE]">

        {/* Sarlavha matni */}
        <h2 className="text-[18px] font-bold text-[#090A0A]">
          Mening kartalarim
        </h2>

        {/* Filter tablar — kulrang pill konteyner ichida */}
        <div className="flex items-center bg-[#F0F2F8] rounded-full p-1 gap-0.5">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-1.5 rounded-full text-[13px] font-semibold transition-all ${
                activeTab === key
                  ? "bg-[#172AB4] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Karta qo'shish — oq fon + chegara */}
        <button
          onClick={onAddCard}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-[#172AB4] text-[14px] font-semibold hover:border-[#172AB4]/40 transition-colors"
        >
          <AddCircleIcon />
          Karta qo'shish
        </button>
      </div>

      {/* ── Kontent ── */}
      <div className="p-5">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-[220px] rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : cards.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card) => (
              <PassportCardFull
                key={card.id}
                card={card}
                onClick={onSelectCard}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
