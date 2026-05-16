import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import CopyIcon from "@/assets/svg/CopyIcon";
import EditPhoneModal from "./EditPhoneModal";
import SuccessToast from "@/components/ui/SuccessToast";

function InfoCard({ label, value, copyable = false, className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    if (!value) return;
    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className={`inline-flex flex-col gap-1.5 bg-[#F8FAFC] rounded-2xl px-5 py-4 ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[16px] font-semibold text-[#475569]">{label}</span>
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            className={`shrink-0 transition-opacity ${copied ? "opacity-50" : "hover:opacity-70"}`}
            aria-label="copy"
          >
            <CopyIcon />
          </button>
        )}
      </div>
      <span className="text-[18px] font-bold text-[#090A0A] truncate">
        {value || <span className="text-gray-300">—</span>}
      </span>
    </div>
  );
}

export default function PersonalData({ userData = {}, onUpdate }) {
  const { t } = useTranslation();
  const outletCtx = useOutletContext?.() ?? {};
  const { editClickTick } = outletCtx;

  const [data, setData] = useState({
    phone: "+998 90 123 45 67",
    name: "Закиров Шухрат Касымджанович",
    birthDate: "14.02.1990",
    passport: "AD 1830473",
    pinfl: "34567890987",
    address: "Ташкент, Юнусабадский район, 15",
    ...userData,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const lastTickRef = useRef(editClickTick);

  useEffect(() => {
    if (editClickTick !== lastTickRef.current) {
      lastTickRef.current = editClickTick;
      setModalOpen(true);
    }
  }, [editClickTick]);

  const handleSavePhone = (newPhone) => {
    setData((prev) => ({ ...prev, phone: newPhone }));
    onUpdate?.({ ...data, phone: newPhone });
    setModalOpen(false);
    setToast(t("phoneSaved"));
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <InfoCard label={t("phoneNumber")} value={data.phone} />
        <InfoCard label={t("fullName")} value={data.name} />
        <InfoCard label={t("birthDate")} value={data.birthDate} />
        <InfoCard label={t("passportOrId")} value={data.passport} copyable />
        <InfoCard label={t("pinfl")} value={data.pinfl} copyable />
        <InfoCard label={t("addressLabel")} value={data.address} />
      </div>

      {modalOpen && (
        <EditPhoneModal
          initialValue={data.phone}
          onClose={() => setModalOpen(false)}
          onSave={handleSavePhone}
        />
      )}

      {toast && (
        <SuccessToast message={toast} onClose={() => setToast(null)} />
      )}
    </>
  );
}
