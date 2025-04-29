import React from "react";
import Image from "next/image";
import clsx from "clsx";
import filter from "@/app/images/icon/filter.svg";

type InputBoxProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
};

const FilterInput: React.FC<InputBoxProps> = ({
  value,
  onChange,
  placeholder = "",
  error = false,
  disabled = false,
  className = "",
  onClick,
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          "w-full h-[60px] pl-4 pr-12 text-text-secondary rounded-[10px] outline-none transition border border-background-light", // pr-12로 아이콘 공간 확보
          {
            "bg-background-soft text-text-light": disabled,
            "focus:border-main": !disabled && !error,
          }
        )}
      />
      <Image
        src={filter}
        alt="filter"
        width={20}
        height={20}
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
};

export default FilterInput;
