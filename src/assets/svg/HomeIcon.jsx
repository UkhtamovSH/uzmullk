import React from "react";

const HomeIcon = () => {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_4090_59731)">
        <rect
          x="14"
          y="10"
          width="40"
          height="40"
          rx="20"
          fill="url(#paint0_linear_4090_59731)"
          shapeRendering="crispEdges"
        />
        <mask
          id="mask0_4090_59731"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="22"
          y="18"
          width="24"
          height="24"
        >
          <rect x="22" y="18" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_4090_59731)">
          <path
            d="M34 33C34.8333 33 35.5417 32.7083 36.125 32.125C36.7083 31.5417 37 30.8333 37 30C37 29.1667 36.7083 28.4583 36.125 27.875C35.5417 27.2917 34.8333 27 34 27C33.1667 27 32.4583 27.2917 31.875 27.875C31.2917 28.4583 31 29.1667 31 30C31 30.8333 31.2917 31.5417 31.875 32.125C32.4583 32.7083 33.1667 33 34 33ZM34 34C33.0333 34 32.0958 34.1375 31.1875 34.4125C30.2792 34.6875 29.4167 35.0833 28.6 35.6C28.4 35.7167 28.25 35.875 28.15 36.075C28.05 36.275 28 36.4917 28 36.725V37H40V36.725C40 36.4917 39.95 36.275 39.85 36.075C39.75 35.875 39.6 35.7167 39.4 35.6C38.5833 35.0833 37.7208 34.6875 36.8125 34.4125C35.9042 34.1375 34.9667 34 34 34ZM28 39C27.45 39 26.9792 38.8042 26.5875 38.4125C26.1958 38.0208 26 37.55 26 37V28C26 27.6833 26.0708 27.3833 26.2125 27.1C26.3542 26.8167 26.55 26.5833 26.8 26.4L32.8 21.9C33.15 21.6333 33.55 21.5 34 21.5C34.45 21.5 34.85 21.6333 35.2 21.9L41.2 26.4C41.45 26.5833 41.6458 26.8167 41.7875 27.1C41.9292 27.3833 42 27.6833 42 28V37C42 37.55 41.8042 38.0208 41.4125 38.4125C41.0208 38.8042 40.55 39 40 39H28Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_4090_59731"
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
            values="0 0 0 0 0.00392157 0 0 0 0 0.811765 0 0 0 0 0.694118 0 0 0 0.6 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4090_59731"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4090_59731"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_4090_59731"
          x1="34"
          y1="10"
          x2="34"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#01D0B4" />
          <stop offset="1" stopColor="#00C687" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default HomeIcon;
