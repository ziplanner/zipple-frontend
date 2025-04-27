"use client";

import { useState } from "react";
import { BasicBtn } from "@/app/components/button/basicBtn";
import { BlackBtn } from "@/app/components/button/blackBtn";
import { BlueBtn } from "@/app/components/button/blueBtn";
import { PrimaryBtn } from "@/app/components/button/primaryBtn";
import { MultiSelectBox } from "@/app/components/selectBox/multiSelectBox";
import { SelectBox } from "@/app/components/selectBox/selectBox";
import { CustomSelectBox } from "@/app/components/selectBox/customSelectBox";

const Test = () => {
  const [selectValue, setSelectValue] = useState<string>("선택 1");
  const [checkedValues, setCheckedValues] = useState<string[]>([
    "원룸/소형 이사",
    "사무실 이사",
  ]);
  const [customSelect, setCustomSelect] = useState<string>("선택 1");

  return (
    <div className="p-20">
      <div>
        <PrimaryBtn text={"Button"} />
        <BlackBtn text={"Button"} />
        <BlueBtn text={"Button"} />
        <BasicBtn text={"Button"} />
      </div>
      <div className="flex flex-col gap-8 p-8">
        <div>
          <h2 className="font-bold text-xl mb-2">Select Box</h2>
          <SelectBox
            options={["선택 1", "선택 2", "선택 3"]}
            value={selectValue}
            onChange={setSelectValue}
          />
          <div className="mt-4">
            <SelectBox
              options={["비활성화된 경우"]}
              value={"비활성화된 경우"}
              onChange={() => {}}
              disabled
            />
          </div>
        </div>

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
              { label: "용달/화물 운송", value: "용달/화물 운송" },
            ]}
            selectedValues={checkedValues}
            onChange={setCheckedValues}
          />
        </div>
      </div>
      <div className="p-8">
        <h2 className="font-bold text-xl mb-4">커스텀 드롭다운</h2>
        <CustomSelectBox
          options={["선택 1", "선택 2", "선택 3"]}
          value={customSelect}
          onChange={setCustomSelect}
        />
      </div>
    </div>
  );
};

export default Test;
