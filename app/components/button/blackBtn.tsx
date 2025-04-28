import { ButtonProps } from "./primaryBtn";

export const BlackBtn = ({ text, className = "", onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`h-10 md:h-[48px] px-[36px] rounded-[6px] bg-btn text-white
        text-14m md:text-18s ${className}`}
  >
    {text}
  </button>
);
