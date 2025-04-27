import { ButtonProps } from "./primaryBtn";

export const LargeBtn = ({
  text,
  color,
  className = "",
  onClick,
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={`h-[60px] w-[520px] rounded-[10px] text-white text-18s
        ${color === "black" ? "bg-btn" : "bg-main"} ${className}`}
  >
    {text}
  </button>
);
