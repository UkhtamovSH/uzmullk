import React from "react";

const ZapIcon = () => {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_4090_59721)">
        <rect
          x="14"
          y="10"
          width="40"
          height="40"
          rx="20"
          fill="url(#paint0_linear_4090_59721)"
          shapeRendering="crispEdges"
        />
        <mask
          id="mask0_4090_59721"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="22"
          y="18"
          width="24"
          height="24"
        >
          <rect x="22" y="18" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_4090_59721)">
          <path
            d="M32.9997 32.5L27.0747 31.75C26.658 31.7 26.3872 31.475 26.2622 31.075C26.1372 30.675 26.2247 30.3333 26.5247 30.05L36.7497 20.25C36.833 20.1667 36.933 20.1042 37.0497 20.0625C37.1663 20.0208 37.3247 20 37.5247 20C37.858 20 38.1122 20.1417 38.2872 20.425C38.4622 20.7083 38.4663 21 38.2997 21.3L34.9997 27.5L40.9247 28.25C41.3413 28.3 41.6122 28.525 41.7372 28.925C41.8622 29.325 41.7747 29.6667 41.4747 29.95L31.2497 39.75C31.1663 39.8333 31.0663 39.8958 30.9497 39.9375C30.833 39.9792 30.6747 40 30.4747 40C30.1413 40 29.8872 39.8583 29.7122 39.575C29.5372 39.2917 29.533 39 29.6997 38.7L32.9997 32.5Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_4090_59721"
          x="0"
          y="0"
          width="68"
          height="68"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="7" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.529412 0 0 0 0 0.282353 0 0 0 0.6 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4090_59721"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4090_59721"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_4090_59721"
          x1="34"
          y1="10"
          x2="34"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF9153" />
          <stop offset="1" stopColor="#FF560E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ZapIcon;
