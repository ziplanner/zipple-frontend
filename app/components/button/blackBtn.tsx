import { ButtonProps } from "./primaryBtn";

export const BlackBtn = ({ text, className = "", onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`h-[48px] px-[36px] rounded-[8px] bg-btn text-white
        text-18s ${className}`}
  >
    {text}
  </button>
);
