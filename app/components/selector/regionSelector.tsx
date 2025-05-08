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
  const [selectedCity, setSelectedCity] = useState<string>(CITIES[1].value); // default to SEOUL

  const getDistricts = (cityCode: string): { label: string; value: string }[] =>
    districtMap[cityCode] || [];

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
  const selectedCityLabel =
    CITIES.find((c) => c.value === selectedCity)?.label || selectedCity;

  return (
    <div className="w-full">
      {/* 선택 영역 UI */}
      <div className="flex border shadow-sm h-[260px]">
        {/* 시도 */}
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

        {/* 구군 */}
        <div className="w-3/5 py-2.5 pr-2 overflow-y-auto custom-scrollbar">
          <div className="flex flex-row flex-wrap">
            {districts.map(({ label, value }) => {
              const disabled = isRegionDisabled(selectedCity, value);
              const selected = isRegionSelected(selectedCity, value);

              return (
                <div
                  key={value}
                  onClick={() => toggleRegion(selectedCity, value)}
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
                  <span>{label}</span>
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
              selectedRegions.map((region, index) => {
                const cityLabel =
                  CITIES.find((c) => c.value === region.city)?.label ||
                  region.city;
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
