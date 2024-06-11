// https://feathericons.dev/?search=check&iconset=feather&format=strict-jsx
export default function Checkmark({ size, backgroundColor, color }: TIcon) {
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
      strokeWidth="3"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};