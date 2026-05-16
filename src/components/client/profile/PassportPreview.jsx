import PassportFront from "@/assets/Front.png";

/**
 * Kadastr passport karta — Front.png rasmi fon sifatida,
 * dinamik qiymatlar (propertyType, cadastre, address) ustiga overlay.
 *
 * Bir joyda o'zgartirish — barcha foydalanuvchilarga (sidebar mini,
 * mulklar grid karta, modal ichidagi karta) avtomatik tushadi.
 */
export default function PassportPreview({
  card = {},
  className = "",
  style,
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: "306 / 195",
        backgroundImage: `url(${PassportFront})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        containerType: "inline-size",
        ...style,
      }}
    >
      {/* OBYEKT TURI */}
      <div
        className="absolute"
        style={{ left: "2.8%", right: "16%", top: "33%" }}
      >
        <p
          className="font-semibold text-[#090A0A] leading-tight truncate"
          style={{ fontSize: "2.6cqw" }}
        >
          {card.propertyType ?? "—"}
        </p>
      </div>

      {/* KADASTR RAQAMI */}
      <div
        className="absolute"
        style={{ left: "2.8%", right: "16%", top: "48%" }}
      >
        <p
          className="font-black text-[#090A0A] truncate"
          style={{
            fontSize: "4.2cqw",
            fontFamily: "monospace",
            letterSpacing: "0.02em",
          }}
        >
          {card.cadastre ?? "—"}
        </p>
      </div>

      {/* MANZIL */}
      <div
        className="absolute"
        style={{ left: "2.8%", right: "26%", top: "66%" }}
      >
        <p
          className="font-medium text-[#090A0A] leading-snug line-clamp-2"
          style={{ fontSize: "2.6cqw" }}
        >
          {card.address ?? "—"}
        </p>
      </div>
    </div>
  );
}
