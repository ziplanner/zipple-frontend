"use client";

import { useState } from "react";
import EstimateCard from "@/app/components/card/estimatedCard";
import SearchInput from "@/app/components/input/searchInput";
import { BasicBtn } from "@/app/components/button/basicBtn";
import Pagination from "@/app/components/pagination/pagination";
import {
  mockEstimateList,
  mockRequestList,
} from "@/app/data/mock/mockEstimate";
import RequestCard from "@/app/components/card/requestCard";

const filters = ["3개월", "6개월", "12개월", "전체보기"];

const EstimatePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("3개월");
  const [selectedTab, setSelectedTab] = useState<"요청" | "견적">("견적");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  return (
    <div
      className="flex w-full gap-5 md:gap-10 flex-col md:py-20 py-10
  max-w-screen-xl2 justify-self-center px-[15px] lx:px-20"
    >
      <div className="flex gap-5 mb-[30px] md:mb-[46px]">
        <h2
          className={`cursor-pointer ${
            selectedTab === "견적"
              ? "text-text-primary text-24s md:text-36s"
              : "text-text-light text-24r md:text-36r"
          }`}
          onClick={() => {
            setSelectedTab("견적");
          }}
        >
          받은 견적
        </h2>
        <h2
          className={`cursor-pointer ${
            selectedTab === "요청"
              ? "text-text-primary text-24s md:text-36s"
              : "text-text-light text-24r md:text-36r"
          }`}
          onClick={() => {
            setSelectedTab("요청");
          }}
        >
          받은 요청
        </h2>
      </div>
      {/* Filter Tabs + Search */}
      <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:items-center md:justify-between md:mb-10 mb-5">
        <div className="flex gap-2 md:gap-2.5">
          {filters.map((f) => (
            <BasicBtn
              key={f}
              text={f}
              onClick={() => setSelectedFilter(f)}
              color={selectedFilter === f ? "black" : "white"}
              dimmed={selectedFilter !== f}
            />
          ))}
        </div>

        <SearchInput
          value={searchTerm}
          onChange={(v) => setSearchTerm(v)}
          onSearch={() => console.log("검색 실행:", searchTerm)}
        />
      </div>
      {(selectedTab === "견적"
        ? mockEstimateList.length
        : mockRequestList.length) > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedTab === "견적"
            ? mockEstimateList.map((item, idx) => (
                <EstimateCard key={idx} {...item} />
              ))
            : mockRequestList.map((item, idx) => (
                <RequestCard key={idx} {...item} />
              ))}
        </div>
      ) : (
        <div className="min-h-[60vh]" />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-10 mb-24 md:mb-[120px]"
      />
    </div>
  );
};

export default EstimatePage;
