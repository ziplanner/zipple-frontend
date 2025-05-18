import { useEffect, useState } from "react";
import Pagination from "@/app/components/pagination/pagination";
import ProfileCard from "@/app/components/card/profileCard";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchExpertList } from "@/app/api/matching/api";
import { ExpertResponse } from "@/app/types/api";
import RegionSection from "./regionSection";
import ServiceSection from "./serviceSection";

export default function MainSection() {
  const router = useRouter();
  const param = useSearchParams();
  const typeFromUrl = param.get("type") || "";
  const regionFromUrl = param.getAll("region");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [experts, setExperts] = useState<ExpertResponse[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>(typeFromUrl);
  const [selectedRegions, setSelectedRegions] =
    useState<string[]>(regionFromUrl);

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
        생활 서비스
      </h1>
      <div className="flex flex-col md:flex-row gap-5 md:gap-[60px]">
        <ServiceSection
          onSelect={handleTypeSelect}
          initialValue={selectedType}
        />
        <div className="flex flex-col  w-full">
          <RegionSection
            selectedCodes={selectedRegions}
            onChange={handleRegionSelect}
          />
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
                      router.push(`/profile?id=${expert.expertId}`)
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
