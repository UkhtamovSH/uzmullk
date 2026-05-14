import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, MapPin, Loader2 } from "lucide-react";

// Toshkent markazi — fallback koordinata
const DEFAULT_COORDS = [41.2995, 69.2401];

const w = /** @type {any} */ (window);

function loadYmaps() {
  return new Promise((resolve) => {
    if (w.ymaps) { resolve(w.ymaps); return; }
    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=uz_UZ&load=package.full";
    script.async = true;
    script.onload = () => resolve(w.ymaps);
    document.head.appendChild(script);
  });
}

export default function PropertyMap() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { card } = useOutletContext();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let destroyed = false;

    async function init() {
      try {
        await loadYmaps();
        const ymaps = w.ymaps;
        if (destroyed || !mapRef.current) return;

        await new Promise((res) => ymaps.ready(res));
        if (destroyed || !mapRef.current) return;

        // Avval adres bo'yicha geocode qilishga harakat qilamiz
        let coords = DEFAULT_COORDS;
        if (card?.address) {
          try {
            const geo = await ymaps.geocode(card.address, { results: 1 });
            const first = geo.geoObjects.get(0);
            if (first) coords = first.geometry.getCoordinates();
          } catch (_) { /* geocode xatosi — default coords ishlatamiz */ }
        }
        if (destroyed) return;

        const map = new ymaps.Map(mapRef.current, {
          center: coords,
          zoom: 16,
          controls: ["zoomControl", "fullscreenControl", "geolocationControl"],
        });

        const placemark = new ymaps.Placemark(
          coords,
          {
            balloonContentHeader: card?.propertyType ?? "",
            balloonContentBody:   card?.address ?? "",
            hintContent:          card?.cadastre ?? "",
          },
          {
            preset:    "islands#blueDotIconWithCaption",
            iconColor: "#172AB4",
          }
        );

        map.geoObjects.add(placemark);
        placemark.balloon.open();
        mapInstance.current = map;
        setLoading(false);
      } catch (e) {
        if (!destroyed) { setLoading(false); setError(true); }
      }
    }

    init();
    return () => {
      destroyed = true;
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [card]);

  return (
    <div className="px-4 sm:px-6 py-6 flex flex-col gap-5">

      {/* ── Sarlavha ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/profile/cards")}
          className="hidden md:flex w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 items-center justify-center transition-colors shrink-0"
        >
          <ArrowLeft size={18} className="text-gray-600" strokeWidth={2.5} />
        </button>
        <h2 className="text-[22px] font-bold text-[#090A0A]">{t("propMap")}</h2>
        <MapPin size={18} className="text-gray-300" />
      </div>

      {/* ── Manzil qatori ── */}
      {card?.address && (
        <div className="flex items-start gap-3 px-4 py-3 bg-[#F8F9FB] rounded-xl">
          <MapPin size={16} className="text-[#172AB4] shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] text-gray-400 font-medium mb-0.5">{card.propertyType}</p>
            <p className="text-[13px] font-semibold text-[#090A0A] leading-snug">{card.address}</p>
            <p className="text-[11px] text-gray-400 font-mono mt-0.5">{card.cadastre}</p>
          </div>
        </div>
      )}

      {/* ── Xarita ── */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-[#E2E5EE]" style={{ height: 480 }}>
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center gap-3 z-10">
            <Loader2 size={28} className="text-[#172AB4] animate-spin" />
            <p className="text-sm text-gray-400 font-medium">Xarita yuklanmoqda…</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center gap-2 z-10">
            <MapPin size={32} className="text-gray-300" />
            <p className="text-sm text-gray-400">Xaritani yuklashda xatolik</p>
          </div>
        )}

        {/* Yandex Maps container */}
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
}
