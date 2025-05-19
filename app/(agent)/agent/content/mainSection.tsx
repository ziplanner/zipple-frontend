import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchBrokerList } from "@/app/api/matching/api";
import ProfileCard from "@/app/components/card/profileCard";
import Pagination from "@/app/components/pagination/pagination";
import { BrokerResponse } from "@/app/types/api";
import SpecialtySection from "./specialtySection";
import RegionSection from "./regionSection";

export default function MainSection() {
  const router = useRouter();
  const param = useSearchParams();
  const typeFromUrl = param.get("type") || "";
  const regionFromUrl = param.getAll("region");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [brokers, setBrokers] = useState<BrokerResponse[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>(typeFromUrl);
  const [selectedRegions, setSelectedRegions] =
    useState<string[]>(regionFromUrl);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchBrokerList({
          page: currentPage,
          size: 10,
          specializedType: selectedType,
          area: selectedRegions,
        });

        setBrokers(res.portfolios);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [currentPage, selectedType, selectedRegions]);

  const handleTypeSelect = (val: string) => {
    setSelectedType(val);
    const search = new URLSearchParams(param.toString());
    search.set("type", val);
    router.push(`?${search.toString()}`);
    //   router.push(`?${search.toString()}`, { scroll: false, shallow: true });
  };

  const handleRegionSelect = (codes: string[]) => {
    setSelectedRegions(codes);
    const search = new URLSearchParams(param.toString());
    if (codes.length > 0) {
      search.set("region", codes.join(","));
    } else {
      search.delete("region");
    }
    router.push(`?${search.toString()}`);
    //   router.push(`?${search.toString()}`, { scroll: false, shallow: true });
  };

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
        <SpecialtySection
          onSelect={handleTypeSelect}
          initialValue={selectedType}
        />

        <div className="flex flex-col w-full min-h-[80vh]">
          <RegionSection
            selectedCodes={selectedRegions}
            onChange={handleRegionSelect}
          />
          <div className="md:hidden border-b border-text-primary w-full my-5" />

          <div className="flex flex-col flex-1 justify-between">
            <div className="flex-1">
              {brokers.length > 0 ? (
                brokers.map((agent, i) => (
                  <ProfileCard
                    key={agent.brokerId}
                    onClick={() => router.push(`/profile?id=${agent.brokerId}`)}
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
