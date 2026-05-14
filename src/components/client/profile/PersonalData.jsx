import { useState } from "react";
import { UserCircle, Edit3, Save, X } from "lucide-react";

export default function PersonalData({ userData = {}, onUpdate, loading = false }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...userData });

  const handleSave = () => {
    onUpdate?.(form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ ...userData });
    setEditing(false);
  };

  const fields = [
    { key: "name",      label: "F.I.Sh",              type: "text" },
    { key: "phone",     label: "Telefon raqam",        type: "text" },
    { key: "email",     label: "Elektron pochta",      type: "email" },
    { key: "pinfl",     label: "PINFL",                type: "text" },
    { key: "passport",  label: "Pasport seriya/raqam", type: "text" },
    { key: "birthDate", label: "Tug'ilgan sana",       type: "date" },
    { key: "address",   label: "Manzil",               type: "text" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E5EE] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E5EE]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#172AB4]/10 flex items-center justify-center">
            <UserCircle size={20} className="text-[#172AB4]" />
          </div>
          <h2 className="text-[16px] font-semibold text-[#090A0A]">Shaxsiy ma'lumotlar</h2>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#172AB4] text-[#172AB4] text-sm font-medium hover:bg-[#172AB4]/5 transition-colors"
          >
            <Edit3 size={15} />
            Tahrirlash
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <X size={14} />
              Bekor
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#172AB4] text-white text-sm font-medium hover:bg-[#1322A0] transition-colors disabled:opacity-60"
            >
              <Save size={14} />
              Saqlash
            </button>
          </div>
        )}
      </div>

      {/* Fields */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map(({ key, label, type }) => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
            {editing ? (
              <input
                type={type}
                value={form[key] ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2E5EE] text-sm text-[#090A0A] outline-none focus:border-[#172AB4] focus:ring-2 focus:ring-[#172AB4]/10 transition-all"
              />
            ) : (
              <p className="text-sm font-medium text-[#090A0A] py-2.5 px-1">
                {userData[key] || <span className="text-gray-300">—</span>}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
