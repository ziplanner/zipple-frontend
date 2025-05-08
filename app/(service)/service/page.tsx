"use client";

import { useState } from "react";
import Pagination from "@/app/components/pagination/pagination";
import RegionSection from "./content/regionSection";
import SpecialtySection from "./content/serviceSection";
import ProfileCard from "@/app/components/card/profileCard";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

const DUMMY_DATA = Array(32)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    name: `이름 (${i + 1})`,
    agency: `이사전문업체 (${i + 1})`,
    profileImage: ``,
    propertyType: `원름/소형 이사`,
    portfolioCount: 0,
    greeting: `성실하고 꼼꼼한 상담 도와드립니다. (${i + 1})`,
    description: `(${
      i + 1
    }) 고객님 눈높이에 맞춘 맞춤 매물을 제공해드립니다. 다양한 포트폴리오 보유 중입니다.`,
    locations: ["서울 송파구", "서울 강남구"],
    badges: ["1인가구 전문가"],
    liked: false,
    likeCount: 0,
  }));

export default function ServicePage() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentItems = DUMMY_DATA.slice(startIdx, endIdx);

  const totalPages = Math.ceil(DUMMY_DATA.length / ITEMS_PER_PAGE);

  return (
    <div className="w-full mt-5 md:mt-10">
      <div
        className="flex w-full md:h-32 h-44 bg-sub_bg border border-sub text-sub_text
        text-16s md:text-18s rounded-lg items-center justify-center"
      >
        배너 자리입니다.
      </div>
      <h1 className="text-text-primary text-22s md:text-36s mt-10 mb-9 mb md:mt-20 md:mb-[60px]">
        생활 서비스
      </h1>
      <div className="flex flex-col md:flex-row gap-5 md:gap-[60px]">
        <SpecialtySection />
        <div className="flex flex-col  w-full">
          <RegionSection />
          <div className="md:hidden border-b border-text-primary w-full my-5" />

          <div className="">
            {currentItems.map((agent, i) => (
              <ProfileCard
                key={i}
                {...agent}
                onClick={() => {
                  router.push("/profile/portfolio");
                }}
              />
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mb-24 md:mb-[120px] md:mt-20 mt-[60px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
