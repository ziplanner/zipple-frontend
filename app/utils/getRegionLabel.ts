import { Region } from "../components/selector/regionSelector";
import { CITIES, districtMap } from "../data/region";

export const getRegionLabel = (code: string): string => {
  for (const city of CITIES) {
    const districts = districtMap[city.value];
    if (!districts) continue;

    const district = districts.find((d) => d.value === code);
    if (district) {
      return district.label;
    }
  }
  return code;
};

export const getRegionFromCode = (code: string): Region => {
  for (const city of CITIES) {
    const cityKey = city.value;
    const districts = districtMap[cityKey];
    if (!districts) continue;

    const district = districts.find((d) => d.value === code);
    if (district) {
      return {
        city: city.label, // 예: "서울"
        district: district.label, // 예: "강남구"
      };
    }
  }

  return { city: "알 수 없음", district: code };
};
