// https://feathericons.dev/?search=plus&iconset=feather&format=strict-jsx
export default function Plus({ size, backgroundColor, color }: TIcon) {
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
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
};
