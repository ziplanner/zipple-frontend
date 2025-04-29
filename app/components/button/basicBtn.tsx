import { ButtonProps } from "./primaryBtn";

export const BasicBtn = ({ text, className = "", onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`h-[32px] px-[18px] rounded-[6px] border border-btn
        text-btn text-14m ${className}`}
  >
    {text}
  </button>
);
