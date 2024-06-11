// https://feathericons.dev/?search=more-horizontal&iconset=feather&format=strict-jsx
export default function HorizontalOptions({ size, backgroundColor, color }: TIcon) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
};
