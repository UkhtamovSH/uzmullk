import { FileText, Eye, Calendar } from "lucide-react";

const STATUS_STYLE = {
  new:        { label: "Yangi",         className: "bg-blue-100 text-blue-700" },
  processing: { label: "Ko'rib chiqilmoqda", className: "bg-yellow-100 text-yellow-700" },
  completed:  { label: "Bajarildi",     className: "bg-green-100 text-green-700" },
  rejected:   { label: "Rad etildi",    className: "bg-red-100 text-red-700" },
};

export default function MyApplications({ applications = [], onView, loading = false }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E5EE] overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E2E5EE]">
        <div className="w-10 h-10 rounded-xl bg-[#172AB4]/10 flex items-center justify-center">
          <FileText size={20} className="text-[#172AB4]" />
        </div>
        <div>
          <h2 className="text-[16px] font-semibold text-[#090A0A]">Mening arizalarim</h2>
          <p className="text-xs text-gray-400">{applications.length} ta ariza</p>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[68px] rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
              <FileText size={24} className="text-gray-300" />
            </div>
            <p className="text-sm text-gray-400">Hali ariza topilmadi</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {applications.map((app) => {
              const st = STATUS_STYLE[app.status] ?? STATUS_STYLE.new;
              return (
                <div
                  key={app.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E5EE] hover:border-[#172AB4]/30 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#090A0A] truncate">{app.title}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Calendar size={11} className="text-gray-400" />
                      <span className="text-xs text-gray-400">{app.date}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${st.className}`}>
                    {st.label}
                  </span>
                  <button
                    onClick={() => onView?.(app.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
                  >
                    <Eye size={16} className="text-gray-400" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
