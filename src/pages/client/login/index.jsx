import { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuthStore from "@/store/useAuthStore";
import { requestOtp, verifyOtp } from "@/services/authService";
import LangDropdown from "@/components/ui/LangDropdown";
import brandWhite from "@/assets/brandWhite.svg";
import brandDark from "@/assets/brandDark.svg";

function formatPhone(raw) {
  if (raw.length <= 2) return raw;
  if (raw.length <= 5) return `${raw.slice(0, 2)} ${raw.slice(2)}`;
  if (raw.length <= 7)
    return `${raw.slice(0, 2)} ${raw.slice(2, 5)} ${raw.slice(5)}`;
  return `${raw.slice(0, 2)} ${raw.slice(2, 5)} ${raw.slice(5, 7)} ${raw.slice(7)}`;
}

function PhoneInput({ value, onChange, disabled, placeholder }) {
  return (
    <div
      className={`flex items-center rounded-xl border transition-all ${
        disabled
          ? "border-gray-200 bg-gray-50"
          : "border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15"
      }`}
    >
      <span className="px-4 py-3.5 text-sm font-medium text-gray-600 border-r border-gray-200 select-none whitespace-nowrap">
        +998
      </span>
      <input
        type="tel"
        value={formatPhone(value)}
        onChange={(e) => {
          let raw = e.target.value.replace(/\D/g, "");
          if (raw.startsWith("998") && raw.length > 9) raw = raw.slice(3);
          onChange(raw.slice(0, 9));
        }}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus
        className="flex-1 px-4 py-3.5 text-sm text-gray-900 bg-transparent outline-none placeholder:text-gray-400 disabled:opacity-60"
      />
    </div>
  );
}

function OtpInput({ onChange, error }) {
  const inputs = useRef([]);
  const [digits, setDigits] = useState(Array(6).fill(""));

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const update = (next) => {
    setDigits(next);
    onChange(next.join(""));
  };

  const handleChange = (i, e) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = val;
    update(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      if (!digits[i] && i > 0) {
        const next = [...digits];
        next[i - 1] = "";
        update(next);
        inputs.current[i - 1]?.focus();
      } else {
        const next = [...digits];
        next[i] = "";
        update(next);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const next = Array.from({ length: 6 }, (_, i) => pasted[i] || "");
    update(next);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="flex gap-2">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`w-full aspect-square text-center text-lg font-bold border rounded-xl outline-none transition-all
            ${
              error
                ? "border-red-400 text-red-500 bg-red-50"
                : `border-gray-300 text-gray-900 bg-white
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15
                 ${digit ? "border-blue-400 bg-blue-50/30" : ""}`
            }`}
        />
      ))}
    </div>
  );
}

function Countdown({ seconds, onDone }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    setLeft(seconds);
    const id = setInterval(() => {
      setLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          onDone?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [seconds]);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return (
    <span className="font-semibold text-gray-800">
      {mm}:{ss}
    </span>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpKey, setOtpKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [canResend, setCanResend] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);

  const destination = location.state?.from?.pathname ?? "/home";

  if (isAuthenticated) return <Navigate to={destination} replace />;

  const maskedPhone =
    phone.length >= 9
      ? `+998 (${phone.slice(0, 2)}) *** ${phone.slice(7, 9)}`
      : "+998";

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 9) {
      setError(t("loginPhoneError"));
      return;
    }
    setError("");
    setLoading(true);
    try {
      await requestOtp("998" + phone);
      setStep(2);
      setCanResend(false);
      setCountdownKey((k) => k + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError(t("loginOtpError"));
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { user, token } = await verifyOtp("998" + phone, otp);
      login(user, token);
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || loading) return;
    setOtp("");
    setOtpKey((k) => k + 1);
    setError("");
    setLoading(true);
    try {
      await requestOtp("998" + phone);
      setCanResend(false);
      setCountdownKey((k) => k + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const phoneValid = phone.length === 9;
  const otpValid = otp.length === 6;

  return (
    <div className="flex h-screen">
      {/* ── Left panel ── */}
      <div
        className="hidden md:flex flex-col w-[370px] xl:w-[477px] shrink-0 p-8"
        style={{
          background:
            "radial-gradient(92.45% 92.45% at 6.87% 5.93%, #00A5FE 34%, #0043DE 100%)",
        }}
      >
        <img
          src={brandWhite}
          alt="Uzmulk"
          className="h-[34px] w-auto object-left object-contain"
        />

        <div className="flex-1 flex flex-col justify-center gap-4 py-8 px-16 text-center">
          <h2 className="text-white text-xl font-bold leading-snug">
            {t("loginLeftTitle")}
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            {t("bannerDesc")}
          </p>
        </div>

        <p
          className="text-xs text-center"
          style={{ color: "rgba(255, 255, 255, 1)" }}
        >
          Copyright © 2022 Uzmulk
        </p>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col bg-white overflow-y-auto">
        <div className="flex justify-end px-8 pt-6 shrink-0">
          <LangDropdown />
        </div>

        <div className="flex-1 flex items-center justify-center px-8 py-10">
          <div className="w-full max-w-[380px] space-y-7">
            <div className="flex justify-center">
              <img src={brandDark} alt="Uzmulk" className="h-[38px] w-auto" />
            </div>

            {step === 1 ? (
              <form
                onSubmit={handlePhoneSubmit}
                className="space-y-5"
                noValidate
              >
                <div className="text-center space-y-1.5">
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {t("loginWelcome")}
                  </h1>
                  <p className="text-sm text-gray-500">{t("loginSubtitle")}</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t("loginPhoneLabel")}
                  </label>
                  <PhoneInput
                    value={phone}
                    onChange={(v) => {
                      setPhone(v);
                      setError("");
                    }}
                    disabled={loading}
                    placeholder={t("loginPhonePh")}
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <p className="text-xs text-gray-400 text-center leading-relaxed">
                  {t("loginTerms")}
                  <button
                    type="button"
                    className="text-blue-500 hover:underline"
                  >
                    {t("loginTermsLink")}
                  </button>
                  {t("loginTermsEnd")}
                </p>

                <button
                  type="submit"
                  disabled={loading || !phoneValid}
                  className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
                    phoneValid && !loading
                      ? "text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  style={
                    phoneValid && !loading
                      ? {
                          background:
                            "linear-gradient(94.21deg, #00A5FE 10.94%, #0076FE 58.07%)",
                        }
                      : undefined
                  }
                >
                  {loading ? t("loginSending") : t("loginNext")}
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-5" noValidate>
                <div className="text-center space-y-1.5">
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {t("loginOtpTitle")}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {t("loginOtpSubtitle")}{" "}
                    <span className="font-semibold text-gray-800">
                      {maskedPhone}
                    </span>
                  </p>
                </div>

                <OtpInput
                  key={otpKey}
                  onChange={(v) => {
                    setOtp(v);
                    setError("");
                  }}
                  error={!!error}
                />

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <div className="flex justify-center text-sm text-gray-400">
                  <Countdown
                    key={countdownKey}
                    seconds={45}
                    onDone={() => setCanResend(true)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !otpValid}
                  className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
                    otpValid && !loading
                      ? "text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  style={
                    otpValid && !loading
                      ? {
                          background:
                            "linear-gradient(94.21deg, #00A5FE 10.94%, #0076FE 58.07%)",
                        }
                      : undefined
                  }
                >
                  {loading ? t("loginChecking") : t("loginNext")}
                </button>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend || loading}
                  className={`w-full text-sm text-center py-1 transition-colors ${
                    canResend && !loading
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {t("loginResend")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
