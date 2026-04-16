export function StarIcon({ width = "18", height = "18", filled = 0 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: filled ? "#facc15" : "#0066ff" }}
    >
      <g fill="none">
        <path
          fill="currentColor"
          fillOpacity={filled >= 1 ? "1" : filled >= 0.5 ? "0.5" : "0.16"}
          d="m12 2l2.4 7.619l7.6-.005l-6.114 4.181l2.29 7.253L12 16.624l-6.181 4.424l2.29-7.253L2 9.615l7.595.004z"
        />
        <path
          stroke="currentColor"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
          d="m12 2l2.4 7.619l7.6-.005l-6.114 4.181l2.29 7.253L12 16.624l-6.181 4.424l2.29-7.253L2 9.615l7.595.004z"
        />
      </g>
    </svg>
  );
}
