import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectBoxProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const CustomSelectBox = ({
  options,
  value,
  onChange,
  disabled = false,
}: CustomSelectBoxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`w-full h-[48px] px-4 rounded-[8px] border flex items-center justify-between text-[16px] ${
          disabled
            ? "bg-[#F5F5F5] text-[#BDBDBD] cursor-not-allowed"
            : "border-[#DDDDDD] text-[#333]"
        }`}
      >
        {value || "선택해주세요"}
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          } ${disabled ? "text-[#BDBDBD]" : "text-[#666]"}`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full mt-1 w-full bg-white border border-[#DDDDDD]
        rounded-[8px] shadow-md z-10 overflow-hidden"
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`px-4 py-3 text-[15px] cursor-pointer ${
                value === option ? "text-blue-600 bg-[#F0F4FF]" : "text-[#333]"
              } hover:bg-[#F0F4FF]`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
