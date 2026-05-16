import React from "react";

const FlameIcon = () => {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_4090_59752)">
        <rect
          x="14"
          y="10"
          width="40"
          height="40"
          rx="20"
          fill="url(#paint0_linear_4090_59752)"
          shapeRendering="crispEdges"
        />
        <mask
          id="mask0_4090_59752"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="22"
          y="18"
          width="24"
          height="24"
        >
          <rect x="22" y="18" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_4090_59752)">
          <path
            d="M26 32C26 30.1167 26.5583 28.3083 27.675 26.575C28.7917 24.8417 30.325 23.325 32.275 22.025C32.6417 21.775 33.0208 21.7625 33.4125 21.9875C33.8042 22.2125 34 22.55 34 23V24.3C34 24.8667 34.1958 25.3417 34.5875 25.725C34.9792 26.1083 35.4583 26.3 36.025 26.3C36.3083 26.3 36.5792 26.2375 36.8375 26.1125C37.0958 25.9875 37.325 25.8083 37.525 25.575C37.6583 25.4083 37.8292 25.3042 38.0375 25.2625C38.2458 25.2208 38.4417 25.2667 38.625 25.4C39.675 26.15 40.5 27.1083 41.1 28.275C41.7 29.4417 42 30.6833 42 32C42 33.4667 41.6417 34.8042 40.925 36.0125C40.2083 37.2208 39.2667 38.175 38.1 38.875C38.3833 38.475 38.6042 38.0375 38.7625 37.5625C38.9208 37.0875 39 36.5833 39 36.05C39 35.3833 38.875 34.7542 38.625 34.1625C38.375 33.5708 38.0167 33.0417 37.55 32.575L34 29.1L30.475 32.575C29.9917 33.0583 29.625 33.5917 29.375 34.175C29.125 34.7583 29 35.3833 29 36.05C29 36.5833 29.0792 37.0875 29.2375 37.5625C29.3958 38.0375 29.6167 38.475 29.9 38.875C28.7333 38.175 27.7917 37.2208 27.075 36.0125C26.3583 34.8042 26 33.4667 26 32ZM34 31.9L36.125 33.975C36.4083 34.2583 36.625 34.575 36.775 34.925C36.925 35.275 37 35.65 37 36.05C37 36.8667 36.7083 37.5625 36.125 38.1375C35.5417 38.7125 34.8333 39 34 39C33.1667 39 32.4583 38.7125 31.875 38.1375C31.2917 37.5625 31 36.8667 31 36.05C31 35.6667 31.075 35.2958 31.225 34.9375C31.375 34.5792 31.5917 34.2583 31.875 33.975L34 31.9Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_4090_59752"
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
            values="0 0 0 0 0.0666667 0 0 0 0 0.631373 0 0 0 0 0.988235 0 0 0 0.6 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4090_59752"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4090_59752"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_4090_59752"
          x1="34"
          y1="10"
          x2="34"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00BBFF" />
          <stop offset="1" stopColor="#004D99" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default FlameIcon;
