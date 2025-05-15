"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AgentSection from "./(home)/content/agentSection";
import ExpertSection from "./(home)/content/expertSection";
import MainSection from "./(home)/content/mainSection";
import { SegmentedTab } from "./components/tab/segemtedTab";
import useResponsive from "./hook/useResponsive";
import CarouselSection from "./(home)/content/carouselSection";
import RegionSelectSection from "./(home)/content/regionSelectSection";
import ScrapSection from "./(home)/content/scrapSection";

export default function Home() {
  const isMd = useResponsive("md");
  const [selectedTab, setSelectedTab] = useState<string>("주요 서비스");

  const renderSection = () => {
    switch (selectedTab) {
      case "중개사매칭":
        return <AgentSection key="중개사매칭" />;
      case "주요 서비스":
        return <MainSection key="주요 서비스" />;
      case "생활서비스":
        return <ExpertSection key="생활서비스" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* 내부 컨텐츠: 중앙 정렬 + padding 적용 */}
      <div
        className="bg-white w-full flex flex-col items-center pt-10 md:pt-20 xl:pt-[120px]
        md:max-w-screen-xl2 lx:px-20 mx-auto"
      >
        <h1 className="text-text-primary md:text-48s text-24s">
          어떤 서비스를 찾으시나요?
        </h1>
        <p className="text-text-secondary text-center md:text-20r text-16r mt-5 mb-10 md:mb-20">
          매물 찾기부터 이사 후 정착까지, {""}
          {!isMd && <br />}
          집에 관한 모든 전문가를 한 곳에서
        </p>
        <div>
          <SegmentedTab
            tabs={["중개사매칭", "주요 서비스", "생활서비스"]}
            defaultTab="주요 서비스"
            onChange={(tab) => setSelectedTab(tab)}
            className="md:mb-[60px] mb-12 max-w-[480px]"
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* padding 없이 */}
      <CarouselSection />
      <RegionSelectSection />
      <div className="bg-white w-full flex flex-col items-center md:max-w-screen-xl2 lx:px-20 mx-auto">
        <ScrapSection />
      </div>
    </>
  );
}
