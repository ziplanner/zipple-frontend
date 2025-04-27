"use client";

import { useState } from "react";
import { BasicBtn } from "@/app/components/button/basicBtn";
import { BlackBtn } from "@/app/components/button/blackBtn";
import { BlueBtn } from "@/app/components/button/blueBtn";
import { PrimaryBtn } from "@/app/components/button/primaryBtn";
import { MultiSelectBox } from "@/app/components/selectBox/multiSelectBox";
import { SelectBox } from "@/app/components/selectBox/selectBox";
import { CustomSelectBox } from "@/app/components/selectBox/customSelectBox";
import { LargeBtn } from "@/app/components/button/largeBtn";

const Test = () => {
  const [checkedValues, setCheckedValues] = useState<string[]>([
    "원룸/소형 이사",
    "사무실 이사",
  ]);
  const [customSelect, setCustomSelect] = useState<string>("선택 1");

  return (
    <div className="p-20 text-text-primary">
      <div className="flex gap-3">
        <PrimaryBtn text={"Button"} onClick={() => {}} />
        <BlackBtn text={"Button"} onClick={() => {}} />
        <BlueBtn text={"Button"} onClick={() => {}} />
        <BasicBtn text={"Button"} onClick={() => {}} />
        <div className="flex flex-col gap-2">
          <LargeBtn text={"Button"} onClick={() => {}} color="black" />
          <LargeBtn text={"Button"} onClick={() => {}} color="blue" />
        </div>
      </div>
      <div className="flex flex-col gap-8 p-8">
        <div>
          <h2 className="font-bold text-xl mb-2">Check Box (복수 선택)</h2>
          <MultiSelectBox
            options={[
              {
                label: "가정 이사 (20평 이상)",
                value: "가정 이사",
                disabled: true,
              },
              { label: "원룸/소형 이사", value: "원룸/소형 이사" },
              { label: "사무실 이사", value: "사무실 이사" },
              { label: "해외 이사", value: "해외 이사", disabled: true },
            ]}
            value={checkedValues}
            onChange={setCheckedValues}
          />
        </div>
      </div>
      <div className="p-8">
        <h2 className="font-bold text-xl mb-4">커스텀 드롭다운</h2>
        <div className="flex flex-col gap-2">
          <CustomSelectBox
            options={["선택 1", "선택 2", "선택 3"]}
            value={customSelect}
            onChange={setCustomSelect}
          />
          <CustomSelectBox
            options={["선택 1", "선택 2", "선택 3"]}
            value={customSelect}
            onChange={setCustomSelect}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default Test;
