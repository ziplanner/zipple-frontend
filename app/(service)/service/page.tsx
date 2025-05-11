"use client";

import { useEffect, useState } from "react";
import Pagination from "@/app/components/pagination/pagination";
import RegionSection from "./content/regionSection";
import SpecialtySection from "./content/serviceSection";
import ProfileCard from "@/app/components/card/profileCard";
import { useRouter } from "next/navigation";
import { fetchExpertList } from "@/app/api/matching/api";
import { ExpertResponse } from "@/app/types/api";

export default function ServicePage() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [experts, setExperts] = useState<ExpertResponse[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchExpertList({
          page: currentPage,
          size: 10,
          specializedType: selectedType,
          sortBy: "RECENT",
        });

        setExperts(res.portfolios);
        if (res.totalPages === 0) {
          setTotalPages(1);
        } else {
          setTotalPages(res.totalPages);
        }
      } catch (err) {
        console.error("전문가 불러오기 실패", err);
      }
    };

    loadData();
  }, [currentPage, selectedType]);

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
        <SpecialtySection onSelect={setSelectedType} />
        <div className="flex flex-col  w-full">
          <RegionSection />
          <div className="md:hidden border-b border-text-primary w-full my-5" />

          <div className="flex flex-col flex-1 justify-between">
            <div className="flex-1">
              {experts.length > 0 ? (
                experts.map((expert) => (
                  <ProfileCard
                    brokerId={0}
                    specializedType={""}
                    representativeArea={[]}
                    key={expert.expertId}
                    onClick={() =>
                      router.push(`/profile/portfolio/${expert.expertId}`)
                    }
                    {...expert}
                  />
                ))
              ) : (
                <p className="text-center text-text-secondary mt-10">
                  전문가가 없습니다.
                </p>
              )}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-10 mb-24 md:mb-[120px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
