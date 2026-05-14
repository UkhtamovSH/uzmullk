import { Shield, UserX, Calendar, Building2 } from "lucide-react";

export default function Access({ accesses = [], onRevoke, loading = false }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E5EE] overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E2E5EE]">
        <div className="w-10 h-10 rounded-xl bg-[#172AB4]/10 flex items-center justify-center">
          <Shield size={20} className="text-[#172AB4]" />
        </div>
        <div>
          <h2 className="text-[16px] font-semibold text-[#090A0A]">Kirish huquqlari</h2>
          <p className="text-xs text-gray-400">Boshqalarga berilgan kirish huquqlari</p>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-[80px] rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : accesses.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
              <Shield size={24} className="text-gray-300" />
            </div>
            <p className="text-sm text-gray-400">Hali hech kimga kirish huquqi berilmagan</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {accesses.map((acc) => (
              <div
                key={acc.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E5EE]"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-gray-500">
                    {acc.name?.[0]?.toUpperCase() ?? "?"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#090A0A] truncate">{acc.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Building2 size={11} />
                      {acc.cadastre}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={11} />
                      {acc.grantedAt}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full shrink-0">
                  {acc.role}
                </span>
                <button
                  onClick={() => onRevoke?.(acc.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                  title="Huquqni bekor qilish"
                >
                  <UserX size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
