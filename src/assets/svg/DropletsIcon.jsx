import React from "react";

const DropletsIcon = () => {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_4090_59741)">
        <rect
          x="14"
          y="10"
          width="40"
          height="40"
          rx="20"
          fill="url(#paint0_linear_4090_59741)"
          shapeRendering="crispEdges"
        />
        <mask
          id="mask0_4090_59741"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="22"
          y="18"
          width="24"
          height="24"
        >
          <rect x="22" y="18" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_4090_59741)">
          <path
            d="M25 31H29V30H27C26.7167 30 26.4792 29.9042 26.2875 29.7125C26.0958 29.5208 26 29.2833 26 29C26 28.7167 26.0958 28.4792 26.2875 28.2875C26.4792 28.0958 26.7167 28 27 28H29C29.55 28 30.0208 28.1958 30.4125 28.5875C30.8042 28.9792 31 29.45 31 30V31H33V24.1C33 22.95 33.4 21.9792 34.2 21.1875C35 20.3958 35.975 20 37.125 20C37.8917 20 38.6 20.2 39.25 20.6C39.9 21 40.4 21.55 40.75 22.25L41.45 23.65C41.5833 23.9 41.6042 24.1542 41.5125 24.4125C41.4208 24.6708 41.25 24.8667 41 25C40.75 25.1333 40.4958 25.1542 40.2375 25.0625C39.9792 24.9708 39.7833 24.8 39.65 24.55L38.95 23.15C38.7667 22.8 38.5083 22.5208 38.175 22.3125C37.8417 22.1042 37.4833 22 37.1 22C36.5167 22 36.0208 22.2042 35.6125 22.6125C35.2042 23.0208 35 23.5167 35 24.1V31H37V30C37 29.45 37.1958 28.9792 37.5875 28.5875C37.9792 28.1958 38.45 28 39 28H41C41.2833 28 41.5208 28.0958 41.7125 28.2875C41.9042 28.4792 42 28.7167 42 29C42 29.2833 41.9042 29.5208 41.7125 29.7125C41.5208 29.9042 41.2833 30 41 30H39V31H43C43.2833 31 43.5208 31.0958 43.7125 31.2875C43.9042 31.4792 44 31.7167 44 32C44 32.2833 43.9042 32.5208 43.7125 32.7125C43.5208 32.9042 43.2833 33 43 33H25C24.7167 33 24.4792 32.9042 24.2875 32.7125C24.0958 32.5208 24 32.2833 24 32C24 31.7167 24.0958 31.4792 24.2875 31.2875C24.4792 31.0958 24.7167 31 25 31ZM28 39C27.45 39 26.9792 38.8042 26.5875 38.4125C26.1958 38.0208 26 37.55 26 37V34H42V37C42 37.55 41.8042 38.0208 41.4125 38.4125C41.0208 38.8042 40.55 39 40 39H28Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_4090_59741"
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
            result="effect1_dropShadow_4090_59741"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4090_59741"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_4090_59741"
          x1="34"
          y1="10"
          x2="34"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#12A8FF" />
          <stop offset="1" stopColor="#005EDA" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default DropletsIcon;
