import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyCardsComp from "@/components/client/profile/MyCards";
import CadastreModal from "@/components/client/home/CadastreModal";
import CadastrPassportModal from "@/components/client/profile/CadastrPassportModal";
import useCardsStore from "@/store/useCardsStore";

function fetchPropertyByCadastre(cadastre) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id:           Date.now(),
        cadastre,
        propertyType: "Yakka tartibdagi turar joy",
        address:      "Toshkent sh., Olmazor tumani, Qorasuv mah. 2/4 dahasi, Usta Omon ko'chasi, 44 'A' uy",
        isActive:     false,
        totalArea:    1000,
        actualArea:   650,
        buildArea:    1000,
        usableArea:   1000,
        captureArea:  340,
        yardArea:     340,
        livingArea:   1000,
        usefulArea:   1000,
        floors:       5,
        rooms:        3,
        builtYear:    2005,
      });
    }, 600);
  });
}

export default function MyCardsPage() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const cards     = useCardsStore((s) => s.cards);
  const addCard   = useCardsStore((s) => s.addCard);

  const [cadastreOpen, setCadastreOpen] = useState(false);
  const [passportData,  setPassportData]  = useState(null);
  const [loading,       setLoading]       = useState(false);

  const handleCadastreNext = useCallback(async (cadastre) => {
    setCadastreOpen(false);
    setLoading(true);
    try {
      const data = await fetchPropertyByCadastre(cadastre);
      setPassportData(data);
    } finally {
      setLoading(false);
    }
  }, []);

  // Navbar "Obyekt qo'shish" → /profile/cards?state.cadastre
  useEffect(() => {
    const cadastre = location.state?.cadastre;
    if (cadastre) {
      handleCadastreNext(cadastre);
      window.history.replaceState({}, "");
    }
  }, [handleCadastreNext, location.state?.cadastre]);

  const handleSave = (data) => {
    addCard(data);
    setPassportData(null);
  };

  const handleSelectCard = (card) => {
    navigate(`/profile/cards/${card.id}`);
  };

  return (
    <>
      <MyCardsComp
        cards={cards}
        onAddCard={() => setCadastreOpen(true)}
        onSelectCard={handleSelectCard}
        loading={loading}
      />

      {cadastreOpen && (
        <CadastreModal
          onClose={() => setCadastreOpen(false)}
          onNext={handleCadastreNext}
        />
      )}

      {passportData && (
        <CadastrPassportModal
          data={passportData}
          onClose={() => setPassportData(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
