// https://feathericons.dev/?search=grid&iconset=feather&format=strict-jsx
export default function Grid({ size, backgroundColor, color }: TIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size ? size : "24"}
      height={size ? size : "24"}
      className="main-grid-item-icon"
      fill={backgroundColor ? backgroundColor : "none"}
      stroke={color ? color : "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <rect height="7" width="7" x="3" y="3" />
      <rect height="7" width="7" x="14" y="3" />
      <rect height="7" width="7" x="14" y="14" />
      <rect height="7" width="7" x="3" y="14" />
    </svg>
  );
};
