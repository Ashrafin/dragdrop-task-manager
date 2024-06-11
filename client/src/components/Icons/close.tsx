// https://feathericons.dev/?search=x&iconset=feather&format=strict-jsx
export default function Close({ size, backgroundColor, color }: TIcon) {
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
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
    </svg>
  );
};