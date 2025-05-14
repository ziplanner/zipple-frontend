"use client";

import { SegmentedTab } from "@/app/components/tab/segemtedTab";
import { useState } from "react";

const regions = [
  "서울",
  "경기",
  "인천",
  "강원",
  "대전",
  "세종",
  "충남",
  "충북",
  "부산",
  "울산",
  "경남",
  "대구",
  "광주",
  "전남",
  "전북",
  "제주",
];

const RegionSelectSection = () => {
  const [selectedTab, setSelectedTab] = useState<string>("공인중개사");
  const [selectedRegion, setSelectedRegion] = useState<string>("경기");

  return (
    <section
      className="w-full bg-background-extraSoft py-[60px] md:py-[100px]
    flex justify-center"
    >
      <div className="w-full px-[15px] lx:px-20 md:max-w-screen-xl2">
        {/* 타이틀 + 탭 */}
        <div
          className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between 
        md:items-start items-center mb-10 md:mb-14"
        >
          <h2 className="text-24m md:text-36m text-text-primary text-center">
            어떤 지역의 <span className="text-main">중개사</span>를 찾으시나요?
          </h2>
          <SegmentedTab
            tabs={["공인중개사", "생활서비스 전문가"]}
            defaultTab={selectedTab}
            onChange={setSelectedTab}
            className="bg-white md:max-w-[320px] max-w-[400px]"
          />
        </div>

        {/* 지역 버튼들 */}
        <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-4 md:gap-[18px]">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`flex items-center justify-center 
        h-[60px] md:h-20 bg-white w-full
        text-16r md:text-18r rounded-xl border transition-all
        hover:bg-main_bg2 hover:border-main
        ${
          selectedRegion === region
            ? "border-main text-main font-semibold"
            : "text-text-secondary border-transparent"
        }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegionSelectSection;
