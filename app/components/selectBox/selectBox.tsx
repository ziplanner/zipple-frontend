// components/SelectBox.tsx
import React from "react";

interface SelectBoxProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const SelectBox = ({
  options,
  value,
  onChange,
  disabled = false,
}: SelectBoxProps) => {
  return (
    <select
      className={`w-full h-[48px] px-4 rounded-[12px] border ${
        disabled
          ? "bg-[#F5F5F5] text-[#BDBDBD] cursor-not-allowed"
          : "border-[#DDDDDD] text-text-primary"
      } text-[16px]`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option} value={option} className="text-text-primary">
          {option}
        </option>
      ))}
    </select>
  );
};
