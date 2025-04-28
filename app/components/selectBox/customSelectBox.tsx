"use client";

import { useState, useEffect, useRef } from "react";
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
  const [open, setOpen] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement>(null);

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
    <div ref={boxRef} className="relative w-[520px]">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`w-full h-[60px] px-4 border flex items-center justify-between text-18r border-background-light
          ${
            disabled
              ? "bg-background-soft text-text-light cursor-not-allowed"
              : "text-text-light"
          } ${open ? "rounded-t-[8px]" : "rounded-[8px]"}`}
      >
        {value || "선택해주세요"}
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          } text-text-secondary`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full w-full bg-white border border-background-light border-t-0
        rounded-b-[8px] shadow-md z-10 overflow-hidden"
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`px-4 py-3 text-18r cursor-pointer ${
                value === option ? "text-blue-600" : "text-text-light"
              } hover:bg-hover`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
