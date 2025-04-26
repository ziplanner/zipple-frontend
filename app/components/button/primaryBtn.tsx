import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

export const PrimaryBtn = ({ text, className = "" }: ButtonProps) => (
  <button
    className={`w-[154px] h-[60px] rounded-[12px] border border-main text-main
      text-18s ${className}`}
  >
    {text}
  </button>
);
