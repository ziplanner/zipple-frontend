import React from "react";

interface MultiSelectBoxProps {
  options: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
}

export const MultiSelectBox = ({
  options,
  selectedValues,
  onChange,
}: MultiSelectBoxProps) => {
  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="w-full border border-[#DDDDDD] rounded-[12px] p-4 flex flex-col gap-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center gap-2 ${
            option.disabled ? "text-[#BDBDBD]" : "text-text-primary"
          }`}
        >
          <input
            type="checkbox"
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={() => toggleValue(option.value)}
            disabled={option.disabled}
            className="w-[20px] h-[20px] accent-main"
          />
          <span
            className={`${
              selectedValues.includes(option.value)
                ? "text-main font-semibold"
                : ""
            } ${option.disabled ? "text-[#BDBDBD]" : ""} text-[16px]`}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};
