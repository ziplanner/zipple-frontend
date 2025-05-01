"use client";

import { useState } from "react";
import { PortfolioCard } from "@/app/components/card/portfolioCard";
import Pagination from "@/app/components/pagination/pagination";
import PortfolioBtn from "@/app/components/button/portfolioBtn";

const DUMMY_DATA = Array(30)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    title: `(포트폴리오 ${
      i + 1
    }) 100평대 사무실 임대 최대 한줄까지만 들어가겠습니다! `,
    date: "2025.05.05",
  }));

const ITEMS_PER_PAGE = 12;

const UserPortfolioPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentItems = DUMMY_DATA.slice(startIdx, endIdx);

  const totalPages = Math.ceil(DUMMY_DATA.length / ITEMS_PER_PAGE);

  return (
    <div className="flex w-full flex-col md:px-8 md:py-10 lg:p-[60px]">
      <h1 className="text-text-primary text-22s md:text-30s">
        포토폴리오 관리
      </h1>
      <div className="border-b border-text-primary w-full mt-5 mb-[30px] md:mt-[30px] md:mb-10" />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mb-[60px] md:mb-20">
        {currentItems.map((item) => (
          <PortfolioCard key={item.id} title={item.title} date={item.date} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mb-24 md:mb-[120px]"
      />
      <PortfolioBtn onClick={() => console.log("등록 버튼 클릭됨")} />
    </div>
  );
};

export default UserPortfolioPage;
