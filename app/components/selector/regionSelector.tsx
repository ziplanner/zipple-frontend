"use client";

import { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import close_blue from "@/app/images/icon/close_blue.svg";
import vector_black from "@/app/images/icon/vector.svg";
import gt from "@/app/images/icon/gt.svg";
import { BasicBtn } from "../button/basicBtn";
import { CITIES, districtMap } from "@/app/data/region";
import { DistrictItem } from "./districtItem";

export interface Region {
  city: string;
  district: string;
}

interface RegionSelectorProps {
  selectedRegions: Region[];
  setSelectedRegions: React.Dispatch<React.SetStateAction<Region[]>>;
  disabledRegions?: Region[];
  maxSelectable?: number;
}

export const RegionSelector = ({
  selectedRegions,
  setSelectedRegions,
  disabledRegions = [],
  maxSelectable,
}: RegionSelectorProps) => {
  const router = useRouter();
  const param = useSearchParams();
  const regionFromUrl = param.getAll("region");

  const initialCityFromUrl = useMemo(() => {
    const firstRegion = regionFromUrl[0];
    const cityCode = firstRegion?.split("-")[0];
    const isValidCity = CITIES.some((c) => c.value === cityCode);
    return isValidCity ? cityCode : CITIES[1].value; // 유효하지 않으면 SEOUL
  }, [regionFromUrl]);

  const [selectedCity, setSelectedCity] = useState<string>(initialCityFromUrl);

  const getDistricts = useCallback(
    (cityCode: string) => districtMap[cityCode] || [],
    []
  );

  const isRegionSelected = useCallback(
    (city: string, district: string) =>
      selectedRegions.some((r) => r.city === city && r.district === district),
    [selectedRegions]
  );

  const isRegionDisabled = useCallback(
    (city: string, district: string) =>
      disabledRegions.some((r) => r.city === city && r.district === district),
    [disabledRegions]
  );

  const isAllDistrictSelected = useCallback(
    (city: string) => {
      const districts = getDistricts(city).filter((d) => d.value !== "ALL");
      return districts.every(
        (d) =>
          selectedRegions.some(
            (r) => r.city === city && r.district === d.value
          ) || isRegionDisabled(city, d.value)
      );
    },
    [getDistricts, selectedRegions, isRegionDisabled]
  );

  const updateURL = (regions: Region[]) => {
    const query = new URLSearchParams();
    regions.forEach((r) => query.append("region", `${r.city}-${r.district}`));
    router.push(`?${query.toString()}`, { scroll: false });
  };

  const toggleRegion = (city: string, district: string) => {
    if (isRegionDisabled(city, district)) return;

    const isAll = district === "ALL";
    const districtsOfCity = getDistricts(city).filter((d) => d.value !== "ALL");

    setSelectedRegions((prev) => {
      let next: Region[] = [];

      if (isAll) {
        const alreadyAll = isAllDistrictSelected(city);
        if (alreadyAll) {
          next = prev.filter((r) => r.city !== city);
        } else {
          const newDistricts = districtsOfCity
            .filter((d) => !isRegionDisabled(city, d.value))
            .map((d) => ({ city, district: d.value }));
          next = [...prev.filter((r) => r.city !== city), ...newDistricts];
        }
      } else {
        const exists = prev.some(
          (r) => r.city === city && r.district === district
        );
        if (exists) {
          next = prev.filter(
            (r) => !(r.city === city && r.district === district)
          );
        } else {
          if (maxSelectable && prev.length >= maxSelectable) return prev;
          next = [...prev, { city, district }];
        }
      }

      updateURL(next);
      return next;
    });
  };

  const removeRegion = (city: string, district: string) => {
    setSelectedRegions((prev) => {
      const next = prev.filter(
        (r) => !(r.city === city && r.district === district)
      );
      updateURL(next);
      return next;
    });
  };

  const districts = useMemo(
    () => getDistricts(selectedCity),
    [getDistricts, selectedCity]
  );

  return (
    <div className="w-full">
      <div className="flex border shadow-sm h-[260px]">
        <div className="w-2/5 border-r px-2 py-2.5 bg-background-soft overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2">
            {CITIES.map((city) => (
              <div
                key={city.value}
                onClick={() => setSelectedCity(city.value)}
                className={`cursor-pointer h-12 gap-3 pl-5 flex justify-between items-center rounded-md ${
                  selectedCity === city.value
                    ? "text-text-primary text-14m md:text-16m"
                    : "text-text-secondary text-14r md:text-16r"
                }`}
              >
                <span>{city.label}</span>
                {selectedCity === city.value && (
                  <Image
                    src={vector_black}
                    alt=">"
                    width={10}
                    height={10}
                    className="rotate-90"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-3/5 py-2.5 pr-2 overflow-y-auto custom-scrollbar">
          <div className="flex flex-row flex-wrap">
            {districts.map(({ label, value }) => (
              <DistrictItem
                key={value}
                label={label}
                value={value}
                selected={
                  value === "ALL"
                    ? isAllDistrictSelected(selectedCity)
                    : isRegionSelected(selectedCity, value)
                }
                disabled={isRegionDisabled(selectedCity, value)}
                onClick={() => toggleRegion(selectedCity, value)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-6 mt-5">
        <div className="flex-grow min-w-0 overflow-hidden">
          <div className="flex flex-wrap gap-2 min-h-[48px]">
            {selectedRegions.length > 0 ? (
              selectedRegions.map((region, index) => {
                const cityLabel =
                  CITIES.find((c) => c.value === region.city)?.label ||
                  "(알 수 없음)";
                const districtLabel =
                  districtMap[region.city]?.find(
                    (d) => d.value === region.district
                  )?.label || region.district;
                return (
                  <div
                    key={index}
                    className="flex text-14m items-center px-2.5 h-9 bg-main_bg rounded-md text-main min-w-max"
                  >
                    <span className="flex gap-1 items-center">
                      {cityLabel}
                      <Image src={gt} alt=">" width={10} height={10} />
                      {districtLabel}
                    </span>
                    <button
                      onClick={() => removeRegion(region.city, region.district)}
                      className="ml-2"
                    >
                      <Image src={close_blue} alt="x" width={10} height={10} />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="text-text-light text-14r italic whitespace-nowrap">
                선택된 지역이 없습니다
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2.5 w-[160px] flex-shrink-0 items-end">
          <BasicBtn
            onClick={() => {
              setSelectedRegions([]);
              updateURL([]);
            }}
            text="초기화"
          />
          <BasicBtn onClick={() => {}} text="적용" color="black" />
        </div>
      </div>

      <div className="border-b border-text-primary w-full my-[30px] md:mb-10 md:mt-5" />
    </div>
  );
};
