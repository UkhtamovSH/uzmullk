import { Building2, Plus, ChevronRight, MapPin } from "lucide-react";

const STATUS_STYLE = {
  active:   { label: "Faol",       className: "bg-green-100 text-green-700" },
  pending:  { label: "Kutilmoqda", className: "bg-yellow-100 text-yellow-700" },
  inactive: { label: "Nofaol",     className: "bg-gray-100 text-gray-500" },
};

function PropertyCard({ property, onClick }) {
  const status = STATUS_STYLE[property.status] ?? STATUS_STYLE.inactive;

  return (
    <div
      onClick={() => onClick?.(property)}
      className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E5EE] hover:border-[#172AB4]/30 hover:bg-[#172AB4]/3 cursor-pointer transition-all group"
    >
      <div className="w-12 h-12 rounded-xl bg-[#172AB4]/8 flex items-center justify-center shrink-0">
        <Building2 size={22} className="text-[#172AB4]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-[#090A0A] truncate">{property.address ?? "Manzil ko'rsatilmagan"}</p>
        <div className="flex items-center gap-2 mt-1">
          <MapPin size={11} className="text-gray-400 shrink-0" />
          <p className="text-xs text-gray-400 truncate">{property.cadastre ?? "—"}</p>
          {property.area && <span className="text-xs text-gray-400">· {property.area} m²</span>}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.className}`}>
          {status.label}
        </span>
        <ChevronRight size={16} className="text-gray-300 group-hover:text-[#172AB4] transition-colors" />
      </div>
    </div>
  );
}

export default function MyProperty({ properties = [], onAddProperty, onSelectProperty, loading = false }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E5EE] overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E5EE]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#172AB4]/10 flex items-center justify-center">
            <Building2 size={20} className="text-[#172AB4]" />
          </div>
          <div>
            <h2 className="text-[16px] font-semibold text-[#090A0A]">Mening mulklarim</h2>
            <p className="text-xs text-gray-400">{properties.length} ta obyekt</p>
          </div>
        </div>
        <button
          onClick={onAddProperty}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#172AB4] text-white text-sm font-medium hover:bg-[#1322A0] transition-colors"
        >
          <Plus size={15} />
          Qo'shish
        </button>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[72px] rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
              <Building2 size={24} className="text-gray-300" />
            </div>
            <p className="text-sm text-gray-400">Hali mulk qo'shilmagan</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} onClick={onSelectProperty} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
