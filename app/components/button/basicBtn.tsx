import { ButtonProps } from "./primaryBtn";

export const BasicBtn = ({ text, className = "" }: ButtonProps) => (
  <button
    className={`h-[32px] px-[18px] rounded-[6px] border border-btn
        text-btn text-14m ${className}`}
  >
    {text}
  </button>
);
