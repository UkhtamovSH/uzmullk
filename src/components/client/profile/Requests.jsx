import { MessageSquare, Calendar, ChevronRight } from "lucide-react";

const STATUS_STYLE = {
  open:       { label: "Ochiq",          className: "bg-blue-100 text-blue-700" },
  processing: { label: "Ko'rib chiqilmoqda", className: "bg-yellow-100 text-yellow-700" },
  closed:     { label: "Yopildi",        className: "bg-gray-100 text-gray-500" },
  answered:   { label: "Javob berildi",  className: "bg-green-100 text-green-700" },
};

export default function Requests({ requests = [], onView, loading = false }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E5EE] overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E2E5EE]">
        <div className="w-10 h-10 rounded-xl bg-[#172AB4]/10 flex items-center justify-center">
          <MessageSquare size={20} className="text-[#172AB4]" />
        </div>
        <div>
          <h2 className="text-[16px] font-semibold text-[#090A0A]">So'rovlar</h2>
          <p className="text-xs text-gray-400">{requests.length} ta so'rov</p>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[72px] rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
              <MessageSquare size={24} className="text-gray-300" />
            </div>
            <p className="text-sm text-gray-400">Hali so'rov topilmadi</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map((req) => {
              const st = STATUS_STYLE[req.status] ?? STATUS_STYLE.open;
              return (
                <div
                  key={req.id}
                  onClick={() => onView?.(req.id)}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E5EE] hover:border-[#172AB4]/30 hover:bg-[#172AB4]/3 cursor-pointer transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#090A0A] truncate">{req.description}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Calendar size={11} className="text-gray-400" />
                      <span className="text-xs text-gray-400">{req.date}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${st.className}`}>
                    {st.label}
                  </span>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-[#172AB4] transition-colors shrink-0" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
