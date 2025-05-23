import { useEffect, useState } from "react";
import Image from "next/image";
import close from "@/app/images/icon/close.svg";
import checkOn from "@/app/images/icon/check_on.svg";
import checkOff from "@/app/images/icon/check_off.svg";
import checkNone from "@/app/images/icon/check_none.svg";
import gt from "@/app/images/icon/gt.svg";
import close_blue from "@/app/images/icon/close_blue.svg";
import vector_black from "@/app/images/icon/vector.svg";
import { LargeBtn } from "../button/largeBtn";
import { CITIES, districtMap } from "@/app/data/region";
import { useRouter } from "next/navigation";

interface Region {
  city: string;
  district: string;
}

interface RegionModalProps {
  onClose: () => void;
  onSave?: (selectedRegions: Region[]) => void;
  initialRegions?: Region[];
  disabledRegions?: Region[];
  modalTitle?: string;
  maxSelectable?: number;
  btnType?: "basic" | "double";
  shouldUpdateUrl?: boolean;
}

const RegionModal = ({
  onClose,
  onSave,
  initialRegions = [],
  disabledRegions = [],
  modalTitle = "활동지역",
  maxSelectable,
  btnType = "basic",
  shouldUpdateUrl = true,
}: RegionModalProps) => {
  const router = useRouter();

  const [selectedCity, setSelectedCity] = useState<string>(CITIES[1].value);
  const [selectedRegions, setSelectedRegions] =
    useState<Region[]>(initialRegions);

  const getDistricts = (city: string) => {
    return districtMap[city] || [];
  };

  const isRegionSelected = (city: string, district: string) =>
    selectedRegions.some((r) => r.city === city && r.district === district);

  const isRegionDisabled = (city: string, district: string) =>
    disabledRegions.some((r) => r.city === city && r.district === district);

  const toggleRegion = (city: string, district: string) => {
    if (isRegionDisabled(city, district)) return;

    const districtsOfCity = getDistricts(city).filter((d) => d.value !== "ALL");

    const isAll = district === "ALL";
    const alreadyAllSelected = districtsOfCity.every(
      (d) =>
        selectedRegions.some(
          (r) => r.city === city && r.district === d.value
        ) || isRegionDisabled(city, d.value)
    );

    if (isAll) {
      if (alreadyAllSelected) {
        // 전체 해제
        setSelectedRegions((prev) => prev.filter((r) => r.city !== city));
      } else {
        // 전체 선택
        const newDistricts = districtsOfCity
          .filter((d) => !isRegionDisabled(city, d.value))
          .map((d) => ({ city, district: d.value }));

        setSelectedRegions((prev) => [
          ...prev.filter((r) => r.city !== city),
          ...newDistricts,
        ]);
      }
    } else {
      const alreadySelected = isRegionSelected(city, district);
      if (alreadySelected) {
        setSelectedRegions((prev) =>
          prev.filter((r) => !(r.city === city && r.district === district))
        );
      } else if (!maxSelectable || selectedRegions.length < maxSelectable) {
        setSelectedRegions((prev) => [...prev, { city, district }]);
      }
    }
  };

  const isAllDistrictSelected = (city: string) => {
    const districts = getDistricts(city).filter((d) => d.value !== "ALL");
    return districts.every(
      (d) =>
        selectedRegions.some(
          (r) => r.city === city && r.district === d.value
        ) || isRegionDisabled(city, d.value)
    );
  };

  const removeRegion = (city: string, district: string) => {
    setSelectedRegions((prev) =>
      prev.filter((r) => !(r.city === city && r.district === district))
    );
  };

  const handleSave = () => {
    onSave?.(selectedRegions);

    // URL 업데이트는 선택적으로
    if (shouldUpdateUrl) {
      const query = new URLSearchParams(location.search);
      query.delete("region");
      selectedRegions.forEach((r) =>
        query.append("region", `${r.city}-${r.district}`)
      );
      router.push(`?${query.toString()}`, { scroll: false });
    }

    onClose();
  };

  const districts = getDistricts(selectedCity);
  const selectedCityLabel =
    CITIES.find((c) => c.value === selectedCity)?.label || selectedCity;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div
        className="relative bg-white rounded-[20px] pt-[30px] md:pt-10 w-full max-w-[480px] mx-5
              flex flex-col shadow-lg h-[80vh] overflow-hidden"
      >
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4 p-1">
          <Image src={close} alt="close" width={20} height={20} />
        </button>

        {/* Header */}
        <div className="mb-5 px-5 md:px-10">
          <h1 className="text-text-primary text-18s md:text-20s">
            {modalTitle}
            {maxSelectable && (
              <span className="text-text-secondary text-14r md:text-16r ml-2">
                (최대 {maxSelectable}개)
              </span>
            )}
          </h1>
        </div>

        {/* 선택된 지역 태그 */}
        <div className="flex flex-nowrap no-scrollbar gap-2.5 mb-5 mx-5 overflow-x-auto overflow-y-hidden h-14">
          {selectedRegions.map((region, index) => {
            const cityLabel =
              CITIES.find((c) => c.value === region.city)?.label ||
              "(알 수 없음)";
            const districtLabel =
              districtMap[region.city]?.find((d) => d.value === region.district)
                ?.label || region.district;
            return (
              <div
                key={index}
                className="flex text-14m items-center px-3 py-2.5 bg-main_bg rounded-md text-main min-w-max"
              >
                <span className="flex gap-1">
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
          })}
        </div>

        {/* 지역 선택 영역 */}
        <div className="flex h-full overflow-y-auto">
          {/* 시도 선택 */}
          <div className="w-1/3 bg-background-soft overflow-y-auto custom-scrollbar">
            {CITIES.map((city, index) => (
              <div
                key={index}
                onClick={() => setSelectedCity(city.value)}
                className={`px-4 md:px-5 py-3 md:py-4 cursor-pointer flex justify-between items-center ${
                  selectedCity === city.value
                    ? "text-text-primary text-14m md:text-16m"
                    : "text-text-secondary text-14r md:text-16r"
                }`}
              >
                <span>{city.label}</span>
                {selectedCity === city.value && (
                  <Image
                    src={vector_black}
                    alt="selected"
                    width={10}
                    height={10}
                    className="rotate-90"
                  />
                )}
              </div>
            ))}
          </div>

          {/* 구군 선택 */}
          <div className="w-2/3 overflow-y-auto custom-scrollbar">
            {districts.map(({ label, value }, index) => {
              const disabled = isRegionDisabled(selectedCity, value);
              const selected =
                value === "ALL"
                  ? isAllDistrictSelected(selectedCity)
                  : isRegionSelected(selectedCity, value);

              return (
                <div
                  key={index}
                  onClick={() => !disabled && toggleRegion(selectedCity, value)}
                  className={`px-4 md:px-5 py-2.5 md:py-3 text-14r md:text-16r cursor-pointer flex justify-between items-center
        ${
          disabled
            ? "text-text-light bg-border cursor-not-allowed"
            : selected
            ? "text-main"
            : "text-text-light"
        }`}
                >
                  <span>{label}</span>
                  <Image
                    src={disabled ? checkNone : selected ? checkOn : checkOff}
                    alt="checkbox"
                    width={20}
                    height={20}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* 적용 버튼 */}
        <div className="flex justify-center py-[30px] px-5 md:p-10">
          {btnType === "basic" ? (
            <LargeBtn onClick={handleSave} text="적용" color="blue" />
          ) : (
            <div className="flex w-full gap-2.5">
              <LargeBtn
                onClick={() => {
                  setSelectedRegions([]);

                  const query = new URLSearchParams(location.search);
                  query.delete("region");
                  router.push(`?${query.toString()}`, { scroll: false });
                }}
                text="초기화"
                color="gray"
              />
              <LargeBtn onClick={handleSave} text="적용" color="blue" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegionModal;
