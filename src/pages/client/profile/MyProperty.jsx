import { useState } from "react";
import { useLocation } from "react-router-dom";
import MyPropertyComp from "@/components/client/profile/MyProperty";
import CadastreModal from "@/components/client/home/CadastreModal";

const MOCK_PROPS = [
  { id: 1, address: "Toshkent sh., Chilonzor t., 12-uy", cadastre: "17:13:10:01:05:6963", area: 75,  status: "active" },
  { id: 2, address: "Samarqand sh., Mirzo Ulugbek ko'ch., 5", cadastre: "17:14:02:03:08:1245", area: 120, status: "pending" },
];

export default function MyPropertyPage() {
  const location = useLocation();
  const [properties, setProperties] = useState(MOCK_PROPS);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = () => setModalOpen(true);

  const handleModalNext = (cadastre) => {
    setModalOpen(false);
    // TODO: fetch property info by cadastre from API, then add to list
    const newProp = {
      id: Date.now(),
      address: "Manzil aniqlanmoqda...",
      cadastre,
      area: null,
      status: "pending",
    };
    setProperties((prev) => [...prev, newProp]);
  };

  const handleSelect = (property) => {
    console.log("selected property", property);
  };

  return (
    <>
      <MyPropertyComp
        properties={properties}
        onAddProperty={handleAdd}
        onSelectProperty={handleSelect}
      />

      {modalOpen && (
        <CadastreModal
          onClose={() => setModalOpen(false)}
          onNext={handleModalNext}
        />
      )}
    </>
  );
}
