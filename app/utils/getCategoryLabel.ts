import { Region } from "../components/selector/regionSelector";
import {
  CATEGORY,
  EXPERT_CATEGORY,
  EXPERT_DETAIL_CATEGORY,
} from "../data/category";
import { CITIES, districtMap } from "../data/region";

type CategoryItem = {
  label: string;
  value: string;
};

const ALL_CATEGORIES: CategoryItem[] = [
  ...CATEGORY,
  ...EXPERT_CATEGORY,
  ...EXPERT_DETAIL_CATEGORY,
];

/**
 * 단일 value 값을 label로 변환
 * @param value string
 * @returns string | undefined
 */
export const getLabelFromValue = (value: string): string | undefined => {
  return ALL_CATEGORIES.find((item) => item.value === value)?.label;
};

/**
 * "SEOUL-GANGNAM" 형태의 코드를 "서울 > 강남구"로 변환
 */
export const getRegionDisplayLabel = (code: string): string => {
  const [cityCode, districtCode] = code.split("-");
  const city = CITIES.find((c) => c.value === cityCode)?.label;
  const district = districtMap[cityCode]?.find(
    (d) => d.value === districtCode
  )?.label;

  if (!city || !district) return code; // fallback
  return `${city} > ${district}`;
};

/**
 * "SEOUL-GANGNAM" 형태의 코드를 "서울 강남구"로 변환
 */
export const getRegionDisplayLabel2 = (code: string): string => {
  const [cityCode, districtCode] = code.split("-");
  const city = CITIES.find((c) => c.value === cityCode)?.label;
  const district = districtMap[cityCode]?.find(
    (d) => d.value === districtCode
  )?.label;

  if (!city || !district) return code; // fallback
  return `${city} ${district}`;
};

// Region[]을 도시-구 string[]으로 변환 (서버 전송용)
export const regionToCode = (region: Region): string => {
  if (!region.city || !region.district) return "";
  return `${region.city}-${region.district}`;
};

export const regionArrayToCodes = (regions: Region[]): string[] =>
  regions.map(regionToCode).filter(Boolean);

// 도시-구 string[]을 다시 Region[]으로 변환 (프론트 상태용)
export const codesToRegionArray = (codes: string[]): Region[] => {
  return codes.map((code) => {
    const [city, district] = code.split("-");
    return { city, district };
  });
};

export const codeToRegion = (code: string): Region => {
  const [city, district] = code.split("-");
  return { city, district };
};
