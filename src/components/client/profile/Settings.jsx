import { useState } from "react";
import { Settings2, Bell, Globe, Moon, Save } from "lucide-react";

const LANGS = [
  { value: "uz", label: "O'zbekcha" },
  { value: "ru", label: "Русский" },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? "bg-[#172AB4]" : "bg-gray-200"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

export default function Settings({ settings = {}, onSave, loading = false }) {
  const [form, setForm] = useState({
    notifications: settings.notifications ?? true,
    language:      settings.language ?? "uz",
    darkMode:      settings.darkMode ?? false,
  });

  return (
    <div className="bg-white rounded-2xl border border-[#E2E5EE] overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E2E5EE]">
        <div className="w-10 h-10 rounded-xl bg-[#172AB4]/10 flex items-center justify-center">
          <Settings2 size={20} className="text-[#172AB4]" />
        </div>
        <h2 className="text-[16px] font-semibold text-[#090A0A]">Sozlamalar</h2>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Notifications */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-[#E2E5EE]">
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-gray-400" />
            <div>
              <p className="text-sm font-semibold text-[#090A0A]">Bildirishnomalar</p>
              <p className="text-xs text-gray-400">Email va SMS orqali xabardor bo'lish</p>
            </div>
          </div>
          <Toggle
            checked={form.notifications}
            onChange={(v) => setForm((p) => ({ ...p, notifications: v }))}
          />
        </div>

        {/* Dark mode */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-[#E2E5EE]">
          <div className="flex items-center gap-3">
            <Moon size={18} className="text-gray-400" />
            <div>
              <p className="text-sm font-semibold text-[#090A0A]">Qorang'i rejim</p>
              <p className="text-xs text-gray-400">Interfeys rangini o'zgartirish</p>
            </div>
          </div>
          <Toggle
            checked={form.darkMode}
            onChange={(v) => setForm((p) => ({ ...p, darkMode: v }))}
          />
        </div>

        {/* Language */}
        <div className="p-4 rounded-xl border border-[#E2E5EE]">
          <div className="flex items-center gap-3 mb-3">
            <Globe size={18} className="text-gray-400" />
            <p className="text-sm font-semibold text-[#090A0A]">Til</p>
          </div>
          <div className="flex gap-3">
            {LANGS.map((l) => (
              <button
                key={l.value}
                onClick={() => setForm((p) => ({ ...p, language: l.value }))}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  form.language === l.value
                    ? "bg-[#172AB4] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onSave?.(form)}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#172AB4] text-white text-sm font-semibold hover:bg-[#1322A0] transition-colors disabled:opacity-60"
        >
          <Save size={16} />
          Saqlash
        </button>
      </div>
    </div>
  );
}
