import { ButtonProps } from "./primaryBtn";

export const WhiteBtn = ({ text, className = "", onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`h-[48px] px-[36px] rounded-[6px] bg-white text-main
        text-18s ${className}`}
  >
    {text}
  </button>
);
