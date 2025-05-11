"use client";

import MainSection from "./(home)/content/mainSection";
import { SegmentedTab } from "./components/tab/segemtedTab";

export default function Home() {
  return (
    <div
      className="bg-white w-full flex flex-col items-center py-[120px]
    md:max-w-screen-xl2 px-4 lx:px-20"
    >
      <h1 className="text-text-primary md:text-48s text-36s">
        어떤 서비스를 찾으시나요?
      </h1>
      <p className="text-text-secondary md:text-20r text-18r mt-5 mb-16 md:mb-20">
        매물 찾기부터 이사 후 정착까지, 집에 관한 모든 전문가를 한 곳에서
      </p>
      <SegmentedTab
        tabs={["중개사매칭", "주요 서비스", "생활서비스"]}
        defaultTab="주요 서비스"
        onChange={(tab) => console.log("선택된 탭:", tab)}
        className="md:mb-[60px] mb-12"
      />
      <MainSection />
    </div>
  );
}
