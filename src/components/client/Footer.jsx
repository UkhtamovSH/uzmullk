import { Link } from "react-router-dom";
import brandLogo from "@/assets/brandDark.svg";
import appQr from "@/assets/appqr.png";
import googleQr from "@/assets/googleqr.png";
import { useTranslation } from "react-i18next";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Telegram", href: "https://t.me" },
];

const QR_IMAGES = [
  { src: appQr, alt: "App Store QR" },
  { src: googleQr, alt: "Google Play QR" },
];

const LINK_CLS =
  "block text-[14px] font-medium text-[#090A0A] hover:text-[#0076FE] transition-colors";

const NavItem = ({ label, to, href }) =>
  to ? (
    <Link to={to} className={LINK_CLS}>
      {label}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" className={LINK_CLS}>
      {label}
    </a>
  );

const LinkColumn = ({ items }) => (
  <div className="space-y-2.5">
    {items.map((item) => (
      <NavItem key={item.label} {...item} />
    ))}
  </div>
);

export default function Footer() {
  const { t } = useTranslation();

  const NAV_LINKS = [
    { label: t('footerAbout'),   to: "/about" },
    { label: t('footerPrivacy'), to: "/privacy" },
    { label: t('footerOffer'),   to: "/offer" },
    { label: t('footerHelp'),    to: "/help" },
  ];

  return (
    <footer className="container w-full pt-[60px]">
      <div className="border-y border-[#EBEBEB] flex flex-col md:flex-row justify-between w-full items-start pt-[25px] pb-[17px] gap-6 md:gap-0">
        <div>
          <Link to="/"><img src={brandLogo} alt="Uzmulk" className="h-8" /></Link>
        </div>

        <div className="flex gap-10">
          <LinkColumn items={NAV_LINKS} />
          <LinkColumn items={SOCIAL_LINKS} />
        </div>

        <div className="flex gap-[11.89px]">
          {QR_IMAGES.map(({ src, alt }) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              className="lg:w-[115.78px] lg:h-[136.6px] md:w-[80px] md:h-[96px] w-[55px] h-[70px] cursor-pointer hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-end gap-3 md:gap-0 mt-[17px] mb-[28px]">
        <p className="text-sm font-normal text-[#000]">
          Copyright © 2022 Uzmulk
        </p>
        <div className="md:text-right">
          <p className="text-[15px] font-medium text-[#1F2022]">
            {t('footerSupport')}
          </p>
          <a
            href="tel:+998219010101"
            className="text-[22px] font-bold text-[#1F2022] hover:text-[#0076FE] transition-colors"
          >
            +998 21 901 01 01
          </a>
        </div>
      </div>
    </footer>
  );
}
