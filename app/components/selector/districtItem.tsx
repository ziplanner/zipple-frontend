"use client";

import React from "react";
import Image from "next/image";
import checkOn from "@/app/images/icon/check_on.svg";
import checkOff from "@/app/images/icon/check_off.svg";
import checkNone from "@/app/images/icon/check_none.svg";

interface DistrictItemProps {
  label: string;
  value: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const DistrictItem = React.memo(
  ({ label, value, selected, disabled, onClick }: DistrictItemProps) => {
    return (
      <div
        onClick={onClick}
        className={`flex w-[180px] h-12 gap-3 pl-5 items-center cursor-pointer
        px-2 py-1.5 rounded-md text-14r md:text-16r ${
          disabled
            ? "text-text-light bg-border cursor-not-allowed"
            : selected
            ? "text-main"
            : "text-text-light"
        }`}
      >
        <Image
          src={disabled ? checkNone : selected ? checkOn : checkOff}
          alt="check"
          width={18}
          height={18}
        />
        <span>{label}</span>
      </div>
    );
  }
);
