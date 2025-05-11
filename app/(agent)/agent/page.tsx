"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchBrokerList } from "@/app/api/matching/api";
import ProfileCard from "@/app/components/card/profileCard";
import Pagination from "@/app/components/pagination/pagination";
import RegionSection from "./content/regionSection";
import SpecialtySection from "./content/specialtySection";
import { BrokerResponse } from "@/app/types/api";

export default function AgentPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [brokers, setBrokers] = useState<BrokerResponse[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchBrokerList({
          page: currentPage,
          size: 10,
          specializedType: selectedType,
        });

        setBrokers(res.portfolios);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error(err);
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
        중개사 매칭
      </h1>
      <div className="flex flex-col md:flex-row gap-5 md:gap-[60px]">
        <SpecialtySection onSelect={setSelectedType} />
        <div className="flex flex-col w-full min-h-[80vh]">
          <RegionSection />
          <div className="md:hidden border-b border-text-primary w-full my-5" />

          <div className="flex flex-col flex-1 justify-between">
            <div className="flex-1">
              {brokers.length > 0 ? (
                brokers.map((agent, i) => (
                  <ProfileCard
                    key={agent.brokerId}
                    onClick={() =>
                      router.push(`/profile/portfolio/${agent.brokerId}`)
                    }
                    {...agent}
                  />
                ))
              ) : (
                <p className="text-center text-text-secondary mt-10">
                  중개사가 없습니다.
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
