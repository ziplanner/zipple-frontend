import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import checkOn from "@/app/images/icon/check_on.svg";
import checkOff from "@/app/images/icon/check_off.svg";
import Image from "next/image";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface MultiSelectBoxProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  maxSelectable?: number;
}

export const MultiSelectBox = ({
  options,
  value,
  onChange,
  disabled = false,
  maxSelectable,
}: MultiSelectBoxProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleSelect = (optionValue: string) => {
    if (value.includes(optionValue)) {
      // 선택 해제
      onChange(value.filter((item) => item !== optionValue));
    } else {
      // 선택 추가 (제한 체크)
      if (!maxSelectable || value.length < maxSelectable) {
        onChange([...value, optionValue]);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={boxRef} className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`w-full h-[60px] px-4 border flex items-center justify-between text-18r border-background-light
          ${
            disabled
              ? "bg-background-soft text-text-light cursor-not-allowed"
              : "text-text-light"
          }
          ${open ? "rounded-t-[8px]" : "rounded-[8px]"}`}
      >
        {/* 선택된 옵션들의 label을 ,로 이어서 표시 */}
        {value.length > 0
          ? options
              .filter((opt) => value.includes(opt.value))
              .map((opt) => opt.label)
              .join(", ")
          : "선택해주세요"}
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          } text-text-secondary`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full w-full bg-white border border-background-light border-t-0
          rounded-b-[8px] shadow-md z-10 overflow-auto max-h-[300px]"
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => !option.disabled && handleSelect(option.value)}
              className={`px-4 py-3 flex items-center gap-2 cursor-pointer ${
                option.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-hover"
              }`}
            >
              <Image
                src={value.includes(option.value) ? checkOn : checkOff}
                alt="checkbox"
                width={16}
                height={16}
                className="cursor-pointer"
              />
              <span
                className={`text-18r ${
                  value.includes(option.value) ? "text-main" : "text-text-light"
                }`}
              >
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
