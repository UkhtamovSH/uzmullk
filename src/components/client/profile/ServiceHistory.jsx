import { ClipboardList, Calendar, Download } from "lucide-react";

const STATUS_STYLE = {
  active:    { label: "Faol",          className: "bg-blue-100 text-blue-700" },
  completed: { label: "Bajarildi",     className: "bg-green-100 text-green-700" },
  expired:   { label: "Muddati o'tdi", className: "bg-gray-100 text-gray-500" },
  pending:   { label: "Kutilmoqda",    className: "bg-yellow-100 text-yellow-700" },
};

export default function ServiceHistory({ services = [], onDownload, loading = false }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E5EE] overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E2E5EE]">
        <div className="w-10 h-10 rounded-xl bg-[#172AB4]/10 flex items-center justify-center">
          <ClipboardList size={20} className="text-[#172AB4]" />
        </div>
        <div>
          <h2 className="text-[16px] font-semibold text-[#090A0A]">Xizmatlar tarixi</h2>
          <p className="text-xs text-gray-400">{services.length} ta xizmat</p>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[72px] rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
              <ClipboardList size={24} className="text-gray-300" />
            </div>
            <p className="text-sm text-gray-400">Xizmatlar tarixi topilmadi</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {services.map((svc) => {
              const st = STATUS_STYLE[svc.status] ?? STATUS_STYLE.pending;
              return (
                <div
                  key={svc.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E5EE] hover:border-[#172AB4]/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#172AB4]/8 flex items-center justify-center shrink-0">
                    <ClipboardList size={18} className="text-[#172AB4]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#090A0A] truncate">{svc.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Calendar size={11} className="text-gray-400" />
                      <span className="text-xs text-gray-400">{svc.date}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${st.className}`}>
                    {st.label}
                  </span>
                  {svc.result && (
                    <button
                      onClick={() => onDownload?.(svc.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
                      title="Natijani yuklab olish"
                    >
                      <Download size={15} className="text-gray-400" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
