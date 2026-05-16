import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MoreVertical } from "lucide-react";

const MOCK_REQUESTS = {
  sent: [
    {
      id: 1,
      address:
        "г. Ташкент, Яиланзарский район, МФУ Келажак Турон, улица Югнакий, дом 28, квартира 289",
      cadastre: "17:13:10:01:05:6963",
      datetime: "12.10.2025  13:45",
      status: "accepted",
    },
    {
      id: 2,
      address:
        "г. Ташкент, Яиланзарский район, МФУ Келажак Турон, улица Югнакий, дом 28, квартира 289",
      cadastre: "17:13:10:01:05:6963",
      datetime: "12.10.2025  13:45",
      status: "rejected",
    },
  ],
  received: [],
};

const STATUS_STYLE = {
  accepted: {
    tKey: "statusAccepted",
    className: "bg-[#3B82F6] text-white",
  },
  rejected: {
    tKey: "statusRejected",
    className: "bg-[#FF2F2F] text-white",
  },
  pending: {
    tKey: "statusPending",
    className: "bg-[#F59E0B] text-white",
  },
};

function RequestCard({ request, onMenu }) {
  const { t } = useTranslation();
  const st = STATUS_STYLE[request.status] ?? STATUS_STYLE.pending;

  return (
    <div className="bg-[#F8FAFC] rounded-[18px] p-5">
      <div className="flex items-start justify-between gap-3 mb-5">
        <p className="text-[15px] font-semibold text-[#090A0A] leading-snug">
          {request.address}
        </p>
        <button
          onClick={() => onMenu?.(request.id)}
          className="shrink-0 p-1 -mr-1 -mt-1 rounded-lg hover:bg-gray-200 transition-colors text-gray-500"
        >
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 mb-3">
        <span className="text-[14px] text-[#475569]">
          {t("cadastreNumber")}
        </span>
        <span className="text-[15px] text-[#090A0A] font-semibold">
          {request.cadastre}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 mb-3">
        <span className="text-[14px] text-[#475569]">{t("sendDateTime")}</span>
        <span className="text-[15px] text-[#090A0A] font-semibold">
          {request.datetime}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <span className="text-[14px] text-[#475569]">{t("requestStatus")}</span>
        <span
          className={`text-[13px] font-semibold px-4 py-1.5 rounded-lg ${st.className}`}
        >
          {t(st.tKey)}
        </span>
      </div>
    </div>
  );
}

export default function PropertyRequests() {
  const { requestsTab = "sent" } = useOutletContext() ?? {};
  const { t } = useTranslation();
  const items = MOCK_REQUESTS[requestsTab] ?? [];

  if (items.length === 0) {
    return (
      <div className="bg-white border border-[#E4E7EC] rounded-[20px] py-16 text-center text-sm text-gray-400">
        {t("noRequests")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((r) => (
        <RequestCard key={r.id} request={r} />
      ))}
    </div>
  );
}
