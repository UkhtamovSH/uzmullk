import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { MapPin, Loader2 } from "lucide-react";

// Toshkent markazi — fallback koordinata
const DEFAULT_COORDS = [41.2995, 69.2401];

const w = /** @type {any} */ (window);

function loadYmaps() {
  return new Promise((resolve) => {
    if (w.ymaps) {
      resolve(w.ymaps);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=uz_UZ&load=package.full";
    script.async = true;
    script.onload = () => resolve(w.ymaps);
    document.head.appendChild(script);
  });
}

export default function PropertyMap() {
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
          } catch (_) {
            /* geocode xatosi — default coords ishlatamiz */
          }
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
            balloonContentBody: card?.address ?? "",
            hintContent: card?.cadastre ?? "",
          },
          {
            preset: "islands#blueDotIconWithCaption",
            iconColor: "#172AB4",
          },
        );

        map.geoObjects.add(placemark);
        placemark.balloon.open();
        mapInstance.current = map;
        setLoading(false);
      } catch (e) {
        if (!destroyed) {
          setLoading(false);
          setError(true);
        }
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
    <div className=" flex flex-col gap-5">
      {/* ── Xarita ── */}
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-[#E2E5EE]"
        style={{ height: 480 }}
      >
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center gap-3 z-10">
            <Loader2 size={28} className="text-[#172AB4] animate-spin" />
            <p className="text-sm text-gray-400 font-medium">
              Xarita yuklanmoqda…
            </p>
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
