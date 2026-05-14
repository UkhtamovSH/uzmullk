import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCardsStore = create(
  persist(
    (set, get) => ({
      cards: [],
      addCard: (card) => {
        set((state) => {
          if (state.cards.find((c) => c.cadastre === card.cadastre)) return state;
          return { cards: [...state.cards, card] };
        });
      },
      getCard: (id) =>
        get().cards.find((c) => String(c.id) === String(id)),
    }),
    { name: "uzmulk-cards" }
  )
);

export default useCardsStore;
