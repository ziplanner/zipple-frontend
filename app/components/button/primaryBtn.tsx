import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  text: string;
  className?: string;
  dimmed?: boolean;
}

export const PrimaryBtn = ({ text, className = "", onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`w-[154px] h-[60px] rounded-[10px] border border-main text-main
      text-18s ${className}`}
  >
    {text}
  </button>
);
