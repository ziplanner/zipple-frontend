import { useState } from "react";

interface ChipOption {
  label: string;
  value: string;
}

interface ChipsProps {
  options: ChipOption[];
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const Chips = ({ options, onChange, disabled = false }: ChipsProps) => {
  const [selected, setSelected] = useState<string>(options[0]?.value || "");

  const handleSelect = (value: string) => {
    if (disabled) return;
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className="flex gap-2.5">
      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
            disabled={disabled}
            className={`min-w-[255px] h-[60px] flex items-center justify-center border rounded-[10px] text-18m
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
