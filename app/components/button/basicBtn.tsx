import { ButtonProps } from "./primaryBtn";

export const BasicBtn = ({
  text,
  className = "",
  onClick,
  color,
  dimmed,
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={`h-[32px] px-[18px] rounded-[6px] border whitespace-nowrap ${
      color === "black" ? "bg-btn text-white" : "border-btn text-btn"
    } text-14m ${className}
      ${dimmed ? "text-text-light border-text-light" : ""}`}
  >
    {text}
  </button>
);
