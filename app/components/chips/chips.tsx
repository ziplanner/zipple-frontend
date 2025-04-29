import { useState } from "react";

interface ChipOption {
  label: string;
  value: string;
}

interface ChipsProps {
  options: ChipOption[];
  value?: string; // ✅ 추가
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const Chips = ({
  options,
  value,
  onChange,
  disabled = false,
}: ChipsProps) => {
  const [internalSelected, setInternalSelected] = useState<string>(
    options[0]?.value || ""
  );

  const selected = value !== undefined ? value : internalSelected;

  const handleSelect = (newValue: string) => {
    if (disabled) return;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalSelected(newValue);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2.5">
      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
            disabled={disabled}
            className={`w-full h-[60px] flex items-center justify-center border rounded-[10px] text-18m
              ${
                isSelected
                  ? "border-main text-main"
                  : "border-border text-text-light"
              }
              ${
                disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-hover transition"
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
