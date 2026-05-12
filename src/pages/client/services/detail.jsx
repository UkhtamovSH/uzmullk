import { useState, useCallback, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import {
  Check,
  Upload,
  FileText,
  Loader2,
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";
import ArrowCircleLeftIcon from "@/assets/svg/ArrowCircleLeftIcon";
import React from "react";
import Service1Icon from "@/assets/svg/Service1Icon";
import Service2Icon from "@/assets/svg/Service2Icon";
import Service3Icon from "@/assets/svg/Service3Icon";
import Service4Icon from "@/assets/svg/Service4Icon";
import Service5Icon from "@/assets/svg/Service5Icon";
import Service6Icon from "@/assets/svg/Service6Icon";

const SERVICES = [
  { id: 1, nameKey: "service1", icon: Service1Icon, views: 2381, apps: 839 },
  { id: 2, nameKey: "service2", icon: Service1Icon, views: 2381, apps: 839 },
  { id: 3, nameKey: "service3", icon: Service1Icon, views: 2381, apps: 839 },
  { id: 4, nameKey: "service4", icon: Service2Icon, views: 2382, apps: 840 },
  { id: 5, nameKey: "service5", icon: Service2Icon, views: 2382, apps: 840 },
  { id: 6, nameKey: "service6", icon: Service2Icon, views: 2382, apps: 840 },
  { id: 7, nameKey: "service7", icon: Service3Icon, views: 2383, apps: 841 },
  { id: 8, nameKey: "service8", icon: Service3Icon, views: 2383, apps: 841 },
  { id: 9, nameKey: "service9", icon: Service3Icon, views: 2383, apps: 841 },
  { id: 10, nameKey: "service10", icon: Service4Icon, views: 2384, apps: 842 },
  { id: 11, nameKey: "service11", icon: Service4Icon, views: 2384, apps: 842 },
  { id: 12, nameKey: "service12", icon: Service4Icon, views: 2384, apps: 842 },
  { id: 13, nameKey: "service13", icon: Service5Icon, views: 2385, apps: 843 },
  { id: 14, nameKey: "service14", icon: Service5Icon, views: 2385, apps: 843 },
  { id: 15, nameKey: "service15", icon: Service5Icon, views: 2385, apps: 843 },
  { id: 16, nameKey: "service16", icon: Service6Icon, views: 2386, apps: 844 },
  { id: 17, nameKey: "service17", icon: Service6Icon, views: 2386, apps: 844 },
  { id: 18, nameKey: "service18", icon: Service6Icon, views: 2386, apps: 844 },
];

const TOTAL_STEPS = 7;

// ─── Stepper ─────────────────────────────────────────────────────────────────
function Stepper({ current }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-start w-full mb-7">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((num, idx) => {
        const done = num < current;
        const active = num === current;
        const highlighted = done || active;
        return (
          <React.Fragment key={num}>
            <div className="flex flex-col items-center shrink-0">
              eee
              <div
                style={{
                  width: 70,
                  height: 40,
                  minWidth: 70,
                  minHeight: 40,
                  maxWidth: 70,
                  maxHeight: 40,
                  borderRadius: "38px",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 14,
                  transition: "all 0.2s",
                  backgroundColor: highlighted ? "#172AB4" : "#EEF0FF",
                  color: highlighted ? "#fff" : "#9ca3af",
                }}
              >
                {num}
              </div>
              <span className="text-[11px] mt-1 text-gray-500 whitespace-nowrap">
                {num === 1 ? t("stepLabel1") : "Label"}
              </span>
            </div>
            {idx < TOTAL_STEPS - 1 && (
              <div
                className={`flex-1 h-0.5 mt-[18px] mx-1 transition-colors duration-300 ${
                  done ? "bg-[#172AB4]" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── File Upload ──────────────────────────────────────────────────────────────
function FileUpload({ files, setFiles }) {
  const { t } = useTranslation();

  const onDrop = useCallback(
    (accepted) => {
      const newFiles = accepted.map((file) => ({
        id: Math.random().toString(36).slice(2),
        file,
        status: "loading",
      }));
      setFiles((prev) => [...prev, ...newFiles]);
      newFiles.forEach((f) => {
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((p) => (p.id === f.id ? { ...p, status: "done" } : p)),
          );
        }, 1200);
      });
    },
    [setFiles],
  );

  const { getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png"],
    },
  });

  const remove = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const fmtSize = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
    return `${(bytes / 1024 / 1024).toFixed(0)}MB`;
  };

  return (
    <div>
      <input {...getInputProps()} />
      <div className="flex flex-wrap gap-3">
        {files.map((f) => (
          <div
            key={f.id}
            className="relative flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl p-3 w-[170px] shrink-0"
          >
            {f.status === "loading" ? (
              <>
                <Loader2
                  size={20}
                  className="text-[#172AB4] animate-spin shrink-0"
                />
                <span className="text-xs text-[#000]">{t("uploading")}</span>
              </>
            ) : (
              <>
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-800 truncate">
                    {f.file.name}
                  </p>
                  <p className="text-xs text-[#000]">{fmtSize(f.file.size)}</p>
                </div>
                <button
                  onClick={() => remove(f.id)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
                >
                  <X size={10} className="" />
                </button>
              </>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={open}
          className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-300 rounded-xl text-sm font-medium text-[#172AB4] hover:border-[#172AB4] hover:bg-[#172AB4]/5 transition-colors"
        >
          <Upload size={16} />
          {t("uploadFile")}
        </button>
      </div>
    </div>
  );
}

// ─── Step 1: Terms ────────────────────────────────────────────────────────────
function Step1({ agreed, onAgreedChange }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-5">
      <h2 className="text-lg sm:text-xl font-semibold leading-snug">
        {t("stepTermsTitle")}
      </h2>
      <ul className="space-y-3 text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">
        {[1, 2, 3, 4].map((n) => (
          <li key={n} className="flex gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#000] shrink-0" />
            {t(`stepTermsBullet${n}`)}
          </li>
        ))}
      </ul>
      <label
        className="flex items-center gap-2.5 cursor-pointer group w-fit"
        onClick={() => onAgreedChange(!agreed)}
      >
        <div
          className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors shrink-0 ${
            agreed
              ? "bg-[#172AB4] border-[#172AB4]"
              : "border-gray-300 group-hover:border-[#172AB4]"
          }`}
        >
          {agreed && <Check size={12} className="text-white" strokeWidth={3} />}
        </div>
        <span className="text-sm font-medium text-gray-700">
          {t("stepTermsAgree")}
        </span>
      </label>
    </div>
  );
}

// ─── Step 3: Form ─────────────────────────────────────────────────────────────
function formatPhone(raw) {
  if (raw.length <= 2) return raw;
  if (raw.length <= 5) return `${raw.slice(0, 2)} ${raw.slice(2)}`;
  if (raw.length <= 7)
    return `${raw.slice(0, 2)} ${raw.slice(2, 5)} ${raw.slice(5)}`;
  return `${raw.slice(0, 2)} ${raw.slice(2, 5)} ${raw.slice(5, 7)} ${raw.slice(7)}`;
}

function Step3() {
  const { t } = useTranslation();
  const [selectedObj, setSelectedObj] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [ownerType, setOwnerType] = useState("owner");
  const [files, setFiles] = useState([]);
  const phone2Error = phone2.length > 0 && phone2.length < 9;

  return (
    <div className="space-y-5">
      <h2 className="text-lg sm:text-xl font-semibold">
        {t("stepSectionTitle")}
      </h2>

      {/* Object select */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">
          {t("selectObject")}
        </label>
        <div className="relative">
          <select
            value={selectedObj}
            onChange={(e) => setSelectedObj(e.target.value)}
            className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm  bg-white focus:outline-none focus:border-[#172AB4] transition-colors"
          >
            <option value="">{t("selectObject")}</option>
            <option value="1">Obyekt 1</option>
            <option value="2">Obyekt 2</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6L8 10L12 6"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Phone 1 */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">
          {t("enterPhone")}
        </label>
        <div className="flex items-center rounded-xl border border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15 transition-all">
          <span className="px-4 py-3.5 text-sm font-medium text-gray-600 border-r border-gray-200 select-none whitespace-nowrap">
            +998
          </span>
          <input
            type="tel"
            value={formatPhone(phone1)}
            onChange={(e) => {
              let raw = e.target.value.replace(/\D/g, "");
              if (raw.startsWith("998") && raw.length > 9) raw = raw.slice(3);
              setPhone1(raw.slice(0, 9));
            }}
            placeholder="90 123 45 67"
            className="flex-1 px-4 py-3.5 text-sm text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Radio group */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">
          {t("registrationQ")}
        </p>
        <div className="space-y-2.5">
          {["owner", "trusted"].map((v) => (
            <label
              key={v}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setOwnerType(v)}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                  ownerType === v
                    ? "bg-[#172AB4]"
                    : "bg-gray-300 group-hover:bg-gray-400"
                }`}
              >
                <Check size={8} strokeWidth={3} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-800">
                {t(v === "owner" ? "ownerOption" : "trustedOption")}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* File upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {t("baseFile")}
        </label>
        <FileUpload files={files} setFiles={setFiles} />
      </div>
    </div>
  );
}

// ─── Placeholder step ─────────────────────────────────────────────────────────
function StepPlaceholder({ step }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-300">
      <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center text-2xl font-bold text-gray-300">
        {step}
      </div>
      <p className="text-base font-medium">Label</p>
    </div>
  );
}

// ─── Service Detail card ──────────────────────────────────────────────────────
function ServiceDetail({ service, onApply }) {
  const { t } = useTranslation();

  const stats = [
    { label: t("serviceCost"), value: t("serviceFree") },
    { label: t("serviceViews"), value: service.views },
    { label: t("serviceUsed"), value: service.apps },
    { label: t("serviceDuration"), value: `2 ${t("serviceDays")}` },
  ];

  return (
    <div className="space-y-4">
      {/* Info card */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 sm:p-7">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#172AB4]/10 flex items-center justify-center shrink-0">
            {React.createElement(service.icon)}
          </div>
          <h2 className="text-xl font-bold leading-snug pt-1">
            {t(service.nameKey)}
          </h2>
        </div>
        <p className="text-[14px] sm:text-[15px]  leading-relaxed mb-4">
          {t("serviceDetailDesc")}
        </p>
        <p className="text-[14px] font-semibold text-gray-800 mb-2">
          {t("serviceWhatGives")}
        </p>
        <ul className="space-y-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <li key={n} className="flex gap-2 text-[14px] ">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#000] shrink-0" />
              {t(`serviceWhatBullet${n}`)}
            </li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#E4E7EC]">
          {stats.map((s, i) => (
            <div key={i} className="px-5 py-4">
              <p className="text-xs text-[#000] mb-1">{s.label}</p>
              <p className="text-base font-bold">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onApply}
        className="w-full py-4 rounded-xl text-white text-base font-semibold transition-opacity hover:opacity-90 active:scale-[0.99]"
        style={{
          background:
            "linear-gradient(94.21deg, #00A5FE 10.94%, #0076FE 58.07%)",
        }}
      >
        {t("getService")}
      </button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ServiceDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();

  const [applying, setApplying] = useState(false);
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const service = SERVICES.find((s) => s.id === Number(id));
  if (!service) return <Navigate to="/services" replace />;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handlePrev = () => {
    if (step === 1) {
      setApplying(false);
    } else {
      setStep((s) => s - 1);
    }
    scrollToTop();
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
    scrollToTop();
  };

  const canNext = step !== 1 || agreed;

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="bg-white border border-[#E4E7EC] rounded-[20px] p-[34px] mb-5 flex items-center gap-2">
        <button
          onClick={() =>
            applying ? setApplying(false) : window.history.back()
          }
          className="text-[#000] hover:text-gray-700 transition-colors"
        >
          <ArrowCircleLeftIcon />
        </button>
        <span
          className="text-sm text-gray-500 cursor-pointer"
          onClick={() =>
            applying ? setApplying(false) : window.history.back()
          }
        >
          {t("services")}
        </span>
        <span className="text-sm text-gray-300 mx-0.5">/</span>
        <span className="text-sm font-medium text-gray-800">
          {t("serviceDetailTitle")}
        </span>
      </div>

      {!applying ? (
        <ServiceDetail
          service={service}
          onApply={() => {
            setStep(1);
            setAgreed(false);
            setApplying(true);
          }}
        />
      ) : (
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 sm:p-7">
          <Stepper current={step} />

          <div className="min-h-[300px]">
            {step === 1 && <Step1 agreed={agreed} onAgreedChange={setAgreed} />}
            {step === 3 && <Step3 />}
            {step !== 1 && step !== 3 && <StepPlaceholder step={step} />}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E4E7EC]">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold  hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={16} />
              {t("stepPrev")}
            </button>
            <button
              onClick={handleNext}
              disabled={!canNext}
              className={`flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all ${
                !canNext
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:opacity-90 active:scale-[0.98]"
              }`}
              style={{
                background:
                  "linear-gradient(94.21deg, #00A5FE 10.94%, #0076FE 58.07%)",
              }}
            >
              {t("stepNext")}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
