import { useState } from "react";
import Image from "next/image";
import close_blue from "@/app/images/icon/close_blue.svg";
import checkOn from "@/app/images/icon/check_on.svg";
import checkOff from "@/app/images/icon/check_off.svg";
import checkNone from "@/app/images/icon/check_none.svg";
import vector_black from "@/app/images/icon/vector.svg";
import gt from "@/app/images/icon/gt.svg";
import { BasicBtn } from "../button/basicBtn";
import { CITIES, districtMap } from "@/app/data/region";

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
  const [selectedCity, setSelectedCity] = useState<string>("서울");

  const getDistricts = (city: string): string[] => districtMap[city] || [];

  const isRegionSelected = (city: string, district: string) =>
    selectedRegions.some((r) => r.city === city && r.district === district);

  const isRegionDisabled = (city: string, district: string) =>
    disabledRegions.some((r) => r.city === city && r.district === district);

  const toggleRegion = (city: string, district: string) => {
    if (isRegionDisabled(city, district)) return;

    const exists = isRegionSelected(city, district);
    if (exists) {
      setSelectedRegions((prev) =>
        prev.filter((r) => !(r.city === city && r.district === district))
      );
    } else {
      setSelectedRegions((prev) => [...prev, { city, district }]);
    }
  };

  const removeRegion = (city: string, district: string) => {
    setSelectedRegions((prev) =>
      prev.filter((r) => !(r.city === city && r.district === district))
    );
  };

  const districts = getDistricts(selectedCity);

  return (
    <div className="w-full">
      {/* 선택 영역 UI */}
      <div className="flex border shadow-sm h-[260px]">
        {/* 시도 */}
        <div className="w-2/5 border-r px-2 py-2.5 bg-background-soft overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2">
            {CITIES.map((city) => (
              <div
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`cursor-pointer h-12 gap-3 pl-5 flex justify-between items-center rounded-md ${
                  selectedCity === city
                    ? "text-text-primary text-14m md:text-16m"
                    : "text-text-secondary text-14r md:text-16r"
                }`}
              >
                <span>{city}</span>
                {selectedCity === city && (
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

        {/* 구군 */}
        <div className="w-3/5 py-2.5 pr-2 overflow-y-auto custom-scrollbar">
          <div className="flex flex-row flex-wrap">
            {districts.map((district) => {
              const disabled = isRegionDisabled(selectedCity, district);
              const selected = isRegionSelected(selectedCity, district);

              return (
                <div
                  key={district}
                  onClick={() => toggleRegion(selectedCity, district)}
                  className={`flex w-[180px] h-12 gap-3 pl-5 items-center cursor-pointer
                    px-2 py-1.5 rounded-md text-14r md:text-16r ${
                      disabled
                        ? "text-text-light bg-border cursor-not-allowed"
                        : selected
                        ? "text-main"
                        : "text-text-light"
                    }`}
                >
                  <Image
                    src={disabled ? checkNone : selected ? checkOn : checkOff}
                    alt="check"
                    width={18}
                    height={18}
                  />
                  <span>{district}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 선택된 지역 + 버튼 영역 */}
      <div className="flex justify-between gap-6 mt-5">
        {/* 왼쪽: 선택된 지역 태그 */}
        <div className="flex-grow min-w-0 overflow-hidden">
          <div className="flex flex-wrap gap-2 min-h-[48px]">
            {selectedRegions.length > 0 ? (
              selectedRegions.map((region, index) => (
                <div
                  key={index}
                  className="flex text-14m items-center px-2.5 h-9 bg-main_bg rounded-md text-main min-w-max"
                >
                  <span className="flex gap-1 items-center">
                    {region.city}
                    <Image src={gt} alt=">" width={10} height={10} />
                    {region.district}
                  </span>
                  <button
                    onClick={() => removeRegion(region.city, region.district)}
                    className="ml-2"
                  >
                    <Image src={close_blue} alt="x" width={10} height={10} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-text-light text-14r italic whitespace-nowrap">
                선택된 지역이 없습니다
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽: 버튼 */}
        <div className="flex gap-2.5 w-[160px] flex-shrink-0 items-end">
          <BasicBtn onClick={() => setSelectedRegions([])} text="초기화" />
          <BasicBtn onClick={() => {}} text="적용" color="black" />
        </div>
      </div>

      <div className="border-b border-text-primary w-full my-[30px] md:mb-10 md:mt-5" />
    </div>
  );
};
