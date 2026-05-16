import { Link } from "react-router-dom";
import {
  FileText, MessageSquare, Receipt,
  UserCircle, ChevronRight, Shield, CreditCard,
} from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import Building2Icon from "@/assets/svg/Building2Icon";

const STAT_CARDS = [
  { label: "Mulklar",    value: 0, icon: Building2Icon,     color: "bg-blue-50 text-[#172AB4]",   to: "property" },
  { label: "Arizalar",   value: 0, icon: FileText,       color: "bg-green-50 text-green-600",   to: "applications" },
  { label: "So'rovlar",  value: 0, icon: MessageSquare,  color: "bg-yellow-50 text-yellow-600", to: "requests" },
  { label: "To'lovlar",  value: 0, icon: Receipt,        color: "bg-purple-50 text-purple-600", to: "payments" },
];

const QUICK_LINKS = [
  { to: "personal",         icon: UserCircle,    label: "Shaxsiy ma'lumotlar",  desc: "Ma'lumotlaringizni tahrirlang" },
  { to: "cards",            icon: CreditCard,    label: "Mening kartalarim",    desc: "Karta qo'shish va boshqarish" },
  { to: "property",         icon: Building2Icon,     label: "Mening mulklarim",     desc: "Barcha obiektlaringiz" },
  { to: "access",           icon: Shield,        label: "Kirish huquqlari",     desc: "Boshqalarga berilgan huquqlar" },
];

export default function MainProfile() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#172AB4] to-[#2D4ED8] px-6 py-6 text-white">
        <p className="text-sm text-white/70 font-medium">Xush kelibsiz 👋</p>
        <h1 className="text-xl font-bold mt-1">{user?.name ?? "Foydalanuvchi"}</h1>
        <p className="text-sm text-white/60 mt-1">{user?.phone ?? ""}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STAT_CARDS.map(({ label, value, icon: Icon, color, to }) => (
          <Link
            key={to}
            to={to}
            className="bg-white rounded-2xl border border-[#E2E5EE] p-4 flex flex-col gap-3 hover:border-[#172AB4]/30 hover:shadow-sm transition-all group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#090A0A]">{value}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl border border-[#E2E5EE] overflow-hidden">
        <p className="px-6 py-4 text-sm font-semibold text-gray-400 border-b border-[#E2E5EE]">
          Tezkor o'tish
        </p>
        <div className="p-3 flex flex-col gap-1">
          {QUICK_LINKS.map(({ to, icon: Icon, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#172AB4]/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#172AB4]/8 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-[#172AB4]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-[#090A0A]">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-[#172AB4] transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
