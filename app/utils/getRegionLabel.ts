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
  const [city, district] = code.split("-");
  return { city, district };
};
