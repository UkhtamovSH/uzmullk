import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import AddCircleIcon from "@/assets/svg/AddCircleIcon";
import PassportPreview from "./PassportPreview";

function PassportCardFull({ card, onClick, restrictedLabel }) {
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
            {restrictedLabel}
          </span>
        </div>
      )}
    </div>
  );
}

function EmptyState({ title, desc }) {
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
        <p className="text-[14px] font-semibold text-[#090A0A]">{title}</p>
        <p className="text-xs text-gray-400 mt-1 max-w-[260px] mx-auto leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function MyCards({
  cards = [],
  onAddCard,
  onSelectCard,
  loading = false,
}) {
  const { t } = useTranslation();
  const { setHeaderRight } = useOutletContext?.() ?? {};
  const [activeTab, setActiveTab] = useState("my");

  useEffect(() => {
    if (!setHeaderRight) return;

    const TABS = [
      { key: "my", label: t("tabMyProperties") },
      { key: "all", label: t("tabAllProperties") },
    ];

    setHeaderRight(
      <>
        <div className="flex items-center bg-[#F1F5F9] rounded-full p-1 gap-0.5">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-1.5 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap ${
                activeTab === key
                  ? "text-white"
                  : "text-[#475569] hover:text-[#18181B]"
              }`}
              style={
                activeTab === key
                  ? {
                      background:
                        "linear-gradient(94.21deg, #00A5FE 10.94%, #0076FE 58.07%)",
                    }
                  : undefined
              }
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={onAddCard}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E4E7EC] rounded-xl text-[#172AB4] text-[14px] font-semibold hover:border-[#172AB4]/40 transition-colors whitespace-nowrap"
        >
          <AddCircleIcon />
          {t("addCardBtn")}
        </button>
      </>,
    );

    return () => setHeaderRight(null);
  }, [setHeaderRight, activeTab, onAddCard, t]);

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-[220px] rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : cards.length === 0 ? (
        <EmptyState title={t("emptyCardsTitle")} desc={t("emptyCardsDesc")} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {cards.map((card) => (
            <PassportCardFull
              key={card.id}
              card={card}
              onClick={onSelectCard}
              restrictedLabel={t("restrictedBadge")}
            />
          ))}
        </div>
      )}
    </>
  );
}
