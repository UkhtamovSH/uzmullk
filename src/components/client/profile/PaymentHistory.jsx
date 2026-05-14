import { Receipt, Calendar, ArrowDownLeft, ArrowUpRight } from "lucide-react";

const STATUS_STYLE = {
  success: { label: "O'tdi",         className: "bg-green-100 text-green-700" },
  pending: { label: "Kutilmoqda",    className: "bg-yellow-100 text-yellow-700" },
  failed:  { label: "Muvaffaqiyatsiz", className: "bg-red-100 text-red-700" },
};

export default function PaymentHistory({ payments = [], loading = false }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E5EE] overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E2E5EE]">
        <div className="w-10 h-10 rounded-xl bg-[#172AB4]/10 flex items-center justify-center">
          <Receipt size={20} className="text-[#172AB4]" />
        </div>
        <div>
          <h2 className="text-[16px] font-semibold text-[#090A0A]">To'lov tarixi</h2>
          <p className="text-xs text-gray-400">{payments.length} ta to'lov</p>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[64px] rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : payments.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
              <Receipt size={24} className="text-gray-300" />
            </div>
            <p className="text-sm text-gray-400">To'lov tarixi topilmadi</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {payments.map((p) => {
              const st = STATUS_STYLE[p.status] ?? STATUS_STYLE.pending;
              const isCredit = p.type === "credit";
              return (
                <div key={p.id} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isCredit ? "bg-green-100" : "bg-red-50"}`}>
                    {isCredit
                      ? <ArrowDownLeft size={16} className="text-green-600" />
                      : <ArrowUpRight size={16} className="text-red-500" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-[#090A0A] truncate">{p.description}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Calendar size={11} className="text-gray-400" />
                      <span className="text-xs text-gray-400">{p.date}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-bold ${isCredit ? "text-green-600" : "text-[#090A0A]"}`}>
                      {isCredit ? "+" : "-"}{p.amount?.toLocaleString()} so'm
                    </p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${st.className}`}>
                      {st.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
