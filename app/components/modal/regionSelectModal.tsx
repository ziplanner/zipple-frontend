import { useState } from "react";
import Image from "next/image";
import close from "@/app/images/icon/close.svg";
import checkOn from "@/app/images/icon/check_on.svg";
import checkOff from "@/app/images/icon/check_off.svg";
import gt from "@/app/images/icon/gt.svg";
import close_blue from "@/app/images/icon/close_blue.svg";
import vector_black from "@/app/images/icon/vector.svg";

interface RegionModalProps {
  onClose: () => void;
  onSave?: (selectedRegions: { city: string; district: string }[]) => void;
  initialRegions?: { city: string; district: string }[];
}

const RegionModal = ({
  onClose,
  onSave,
  initialRegions = [],
}: RegionModalProps) => {
  const [selectedCity, setSelectedCity] = useState<string>("서울");
  const [selectedRegions, setSelectedRegions] =
    useState<{ city: string; district: string }[]>(initialRegions);

  const cities = [
    "전국",
    "서울",
    "경기",
    "인천",
    "대전",
    "세종",
    "충남",
    "충북",
    "광주",
    "전남",
  ];

  const getDistricts = (city: string) => {
    switch (city) {
      case "서울":
        return [
          "서울 전체",
          "강남구",
          "강동구",
          "강북구",
          "강서구",
          "관악구",
          "광진구",
          "구로구",
          "금천구",
          "노원구",
        ];
      case "경기":
        return ["경기 전체", "가평군", "고양시", "과천시", "광명시", "광주시"];
      case "인천":
        return ["인천 전체", "강화군", "계양구", "남동구", "동구", "미추홀구"];
      default:
        return [`${city} 전체`];
    }
  };

  const toggleRegion = (city: string, district: string) => {
    const isSelected = selectedRegions.some(
      (region) => region.city === city && region.district === district
    );

    if (isSelected) {
      setSelectedRegions(
        selectedRegions.filter(
          (region) => !(region.city === city && region.district === district)
        )
      );
    } else {
      if (selectedRegions.length < 3) {
        setSelectedRegions([...selectedRegions, { city, district }]);
      }
    }
  };

  const removeRegion = (city: string, district: string) => {
    setSelectedRegions(
      selectedRegions.filter(
        (region) => !(region.city === city && region.district === district)
      )
    );
  };

  const isRegionSelected = (city: string, district: string) => {
    return selectedRegions.some(
      (region) => region.city === city && region.district === district
    );
  };

  const handleSave = () => {
    if (onSave) {
      onSave(selectedRegions);
    }
    onClose();
  };

  const districts = getDistricts(selectedCity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div
        className="relative bg-white rounded-[20px] pt-10 w-[480px]
      flex flex-col shadow-lg h-4/5"
      >
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4 p-1">
          <Image src={close} alt="close" width={20} height={20} />
        </button>

        {/* Header */}
        <div className="mb-5 px-10">
          <h1 className="text-text-primary text-20s">
            대표 활동지역
            <span className="text-text-secondary text-16r ml-2">
              (최대 3개)
            </span>
          </h1>
        </div>

        {/* Selected regions tags */}
        <div className="flex flex-wrap gap-2.5 mb-5 px-5">
          {selectedRegions.map((region, index) => (
            <div
              key={index}
              className="flex items-center bg-main_bg rounded-md px-2.5 py-2 text-main"
            >
              <span className="flex gap-1">
                {region.city}
                <Image src={gt} alt={">"} width={10} height={10} />
                {region.district}
              </span>
              <button
                onClick={() => removeRegion(region.city, region.district)}
                className="ml-2"
              >
                <Image src={close_blue} alt={"x"} width={10} height={10} />
              </button>
            </div>
          ))}
        </div>

        {/* Region selection area */}
        <div className="flex h-full overflow-y-auto">
          {/* Cities column */}
          <div
            className="w-1/3 bg-background-soft overflow-y-auto custom-scrollbar
           rounded-bl-[20px]"
          >
            {cities.map((city, index) => (
              <div
                key={index}
                onClick={() => setSelectedCity(city)}
                className={`px-5 py-4 cursor-pointer flex justify-between items-center ${
                  selectedCity === city
                    ? "text-text-primary text-16m"
                    : "text-text-secondary text-16r"
                }`}
              >
                <span>{city}</span>
                {selectedCity === city && (
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

          {/* Districts column */}
          <div className="w-2/3 overflow-y-auto custom-scrollbar rounded-br-[20px]">
            {districts.map((district, index) => (
              <div
                key={index}
                onClick={() => toggleRegion(selectedCity, district)}
                className={`px-5 py-3 text-16r cursor-pointer flex justify-between items-center
                    ${
                      isRegionSelected(selectedCity, district)
                        ? "text-main"
                        : "text-text-light"
                    }`}
              >
                <span>{district}</span>
                <Image
                  src={
                    isRegionSelected(selectedCity, district)
                      ? checkOn
                      : checkOff
                  }
                  alt="checkbox"
                  width={20}
                  height={20}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        {/* <div className="flex justify-center mt-5 gap-2">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-main text-white rounded-md hover:bg-blue-700"
          >
            선택 완료
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default RegionModal;
