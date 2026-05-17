const DeleteTrashIllustration = ({ className }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M37 128C37 116.402 46.402 107 58 107H142C153.598 107 163 116.402 163 128V128H37V128Z"
        fill="url(#delete-trash-cloud)"
      />
      <ellipse cx="65" cy="125" rx="24" ry="18" fill="url(#delete-trash-left-cloud)" />
      <ellipse cx="137" cy="125" rx="26" ry="18" fill="url(#delete-trash-right-cloud)" />
      <path
        d="M72.488 67.935C73.782 58.672 81.708 51.75 91.061 51.75H108.94C118.292 51.75 126.218 58.672 127.512 67.935L132.76 105.518C134.44 117.556 125.089 128.25 112.935 128.25H87.0648C74.9114 128.25 65.5601 117.556 67.2402 105.518L72.488 67.935Z"
        fill="url(#delete-trash-body)"
      />
      <path
        d="M64.75 62.75C64.75 58.194 68.444 54.5 73 54.5H127C131.556 54.5 135.25 58.194 135.25 62.75V68C135.25 72.556 131.556 76.25 127 76.25H73C68.444 76.25 64.75 72.556 64.75 68V62.75Z"
        fill="url(#delete-trash-lid)"
      />
      <path
        d="M91.25 47.5C91.25 43.7721 94.2721 40.75 98 40.75H102C105.728 40.75 108.75 43.7721 108.75 47.5V54.5H91.25V47.5Z"
        fill="url(#delete-trash-handle)"
      />
      <rect
        x="83.5"
        y="84"
        width="7"
        height="33"
        rx="3.5"
        transform="rotate(-4 83.5 84)"
        fill="url(#delete-trash-line)"
      />
      <rect
        x="100"
        y="83"
        width="7"
        height="35"
        rx="3.5"
        fill="url(#delete-trash-line)"
      />
      <rect
        x="117.5"
        y="84.5"
        width="7"
        height="33"
        rx="3.5"
        transform="rotate(4 117.5 84.5)"
        fill="url(#delete-trash-line)"
      />
      <defs>
        <linearGradient id="delete-trash-body" x1="72" y1="58" x2="131" y2="126" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D9E9FF" />
          <stop offset="1" stopColor="#8AB3FF" />
        </linearGradient>
        <linearGradient id="delete-trash-lid" x1="64.75" y1="54.5" x2="135.25" y2="76.25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CBE0FF" />
          <stop offset="1" stopColor="#7FAAFF" />
        </linearGradient>
        <linearGradient id="delete-trash-handle" x1="91.25" y1="40.75" x2="108.75" y2="54.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8AB3FF" />
          <stop offset="1" stopColor="#4E83F1" />
        </linearGradient>
        <linearGradient id="delete-trash-line" x1="87" y1="83" x2="87" y2="118" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8AB3FF" />
          <stop offset="1" stopColor="#5B8FF5" />
        </linearGradient>
        <linearGradient id="delete-trash-cloud" x1="37" y1="107" x2="163" y2="128" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E7F0FF" />
          <stop offset="1" stopColor="#C1D8FF" />
        </linearGradient>
        <linearGradient id="delete-trash-left-cloud" x1="41" y1="109" x2="89" y2="143" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BFD7FF" />
          <stop offset="1" stopColor="#8CB6FF" />
        </linearGradient>
        <linearGradient id="delete-trash-right-cloud" x1="111" y1="109" x2="163" y2="143" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C9DEFF" />
          <stop offset="1" stopColor="#90B9FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default DeleteTrashIllustration;
