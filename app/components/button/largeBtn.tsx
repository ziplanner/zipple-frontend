import { ButtonProps } from "./primaryBtn";

export const LargeBtn = ({
  text,
  color,
  className = "",
  onClick,
  disabled,
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={`h-[60px] w-[520px] rounded-[10px] text-18s
        ${
          disabled
            ? color === "black"
              ? "bg-btn40 text-white"
              : "bg-main40 text-white"
            : color === "black"
            ? "bg-btn text-white"
            : color === "blue"
            ? "bg-main text-white"
            : color === "white"
            ? "bg-white text-text-secondary"
            : "bg-white border border-black text-black"
        } ${className}
`}
  >
    {text}
  </button>
);
