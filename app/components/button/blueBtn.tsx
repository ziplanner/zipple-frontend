import { ButtonProps } from "./primaryBtn";

export const BlueBtn = ({ text, className = "" }: ButtonProps) => (
  <button
    className={`h-[42px] px-[24px] rounded-[8px] bg-main text-white
        text-16s ${className}`}
  >
    {text}
  </button>
);
