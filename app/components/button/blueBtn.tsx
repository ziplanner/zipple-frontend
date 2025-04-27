import { ButtonProps } from "./primaryBtn";

export const BlueBtn = ({ text, className = "", onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`h-[42px] px-[24px] rounded-[6px] bg-main text-white
        text-16s ${className}`}
  >
    {text}
  </button>
);
