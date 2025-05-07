type SpecialtyCategory = {
  title: string;
  items: {
    label: string;
    value: string;
  }[];
};

type UserSpecialtyCategory = {
  label: string;
  value: string;
};

type UserExpertCategory = {
  label: string;
  value: string;
  disabled?: boolean;
};

export const specialtyCategories: SpecialtyCategory[] = [
  {
    title: "주거 부동산",
    items: [
      { label: "아파트", value: "APARTMENT" },
      { label: "주택/다가구", value: "HOUSE" },
      { label: "빌라/다세대", value: "VILLA" },
      { label: "원룸/투룸", value: "ONE_ROOM_TWO_ROOM" },
      { label: "오피스텔", value: "OFFICE_HOTEL" },
    ],
  },
  {
    title: "상업/업무용 부동산",
    items: [
      { label: "상가 점포", value: "COMMERCIAL_SHOP" },
      { label: "빌딩/상업시설", value: "BUILDING" },
      { label: "사무실", value: "OFFICE" },
      { label: "공장/창고/지식산업센터", value: "FACTORY_WAREHOUSE" },
    ],
  },
  {
    title: "기타/투자 부동산",
    items: [
      { label: "재건축/재개발", value: "RECONSTRUCTION" },
      { label: "토지", value: "LAND" },
      { label: "병원/요양원", value: "HOSPITAL" },
      { label: "경매/분양", value: "AUCTION_SALE" },
    ],
  },
  {
    title: "특수 목적 부동산",
    items: [
      { label: "종교시설", value: "RELIGIOUS_FACILITY" },
      { label: "호텔/모텔/펜션", value: "HOTEL" },
      { label: "기타", value: "OTHER" },
    ],
  },
];

export const livingExpertCategories: SpecialtyCategory[] = [
  {
    title: "이사",
    items: [
      { label: "이사 전체", value: "MOVING_ALL" },
      { label: "원룸/소형 이사", value: "MOVE_SMALL" },
      { label: "가정 이사(20평 이상)", value: "MOVE_LARGE" },
      { label: "용달/화물 운송", value: "FREIGHT_TRANSPORT" },
      { label: "사무실 이사", value: "OFFICE_MOVING" },
      { label: "해외 이사", value: "INTERNATIONAL_MOVING" },
    ],
  },
  {
    title: "청소",
    items: [
      { label: "청소 전체", value: "CLEANING_ALL" },
      { label: "입주 청소", value: "MOVE_IN_CLEAN" },
      { label: "가사 청소", value: "HOUSEHOLD_CLEAN" },
      { label: "가전/가구 청소", value: "APPLIANCE_CLEAN" },
      { label: "사무실 청소", value: "OFFICE_CLEAN" },
      { label: "사업장 청소", value: "COMMERCIAL_CLEAN" },
      { label: "건물 관리", value: "BUILDING_MANAGEMENT" },
      { label: "철거/폐기", value: "DEMOLITION_DISPOSAL" },
      { label: "특수 청소", value: "SPECIAL_CLEAN" },
    ],
  },
  {
    title: "공간 인테리어",
    items: [
      { label: "공간 인테리어 전체", value: "SPACE_INTERIOR_ALL" },
      {
        label: "원룸/오피스텔 시공",
        value: "STUDIO_OFFICE_HOTEL_CONSTRUCTION",
      },
      { label: "아파트 시공", value: "APARTMENT_CONSTRUCTION" },
      { label: "사무실 시공", value: "OFFICE_CONSTRUCTION" },
      { label: "상가 시공", value: "COMMERCIAL_CONSTRUCTION" },
      { label: "주택 시공", value: "HOUSE_CONSTRUCTION" },
      { label: "집수리", value: "HOME_REPAIR" },
    ],
  },
  {
    title: "부분 인테리어",
    items: [
      { label: "부분 인테리어 전체", value: "PARTIAL_INTERIOR_ALL" },
      { label: "도배/장판/마루", value: "WALLPAPER_FLOORING" },
      { label: "욕실/주방", value: "BATH_KITCHEN" },
      { label: "타일/방수/미장", value: "TILE_WATERPROOF_PLASTER" },
      { label: "창호/샷시/중문", value: "WINDOW_SHUTTER" },
      { label: "천장/조명", value: "CEILING_LIGHTING" },
      { label: "베란다/계단/복도", value: "BALCONY_STAIRWAY_CORRIDOR" },
      { label: "단열/방음", value: "INSULATION_SOUNDPROOFING" },
      { label: "붙박이", value: "BUILT_IN_FURNITURE" },
    ],
  },
];

export const CATEGORY: UserSpecialtyCategory[] = [
  { label: "아파트", value: "APARTMENT" },
  { label: "주택/다가구", value: "HOUSE" },
  { label: "빌라/다세대", value: "VILLA" },
  { label: "원룸/투룸", value: "ONE_ROOM_TWO_ROOM" },
  { label: "오피스텔", value: "OFFICE_HOTEL" },
  { label: "상가 점포", value: "COMMERCIAL_SHOP" },
  { label: "빌딩/상업시설", value: "BUILDING" },
  { label: "사무실", value: "OFFICE" },
  { label: "공장/창고/지식산업센터", value: "FACTORY_WAREHOUSE" },
  { label: "재건축/재개발", value: "RECONSTRUCTION" },
  { label: "토지", value: "LAND" },
  { label: "병원/요양원", value: "HOSPITAL" },
  { label: "경매/분양", value: "AUCTION_SALE" },
  { label: "종교시설", value: "RELIGIOUS_FACILITY" },
  { label: "호텔/모텔/펜션", value: "HOTEL" },
  { label: "기타", value: "OTHER" },
];

export const EXPERT_CATEGORY: UserSpecialtyCategory[] = [
  { label: "이사", value: "MOVING" },
  { label: "청소", value: "CLEANING" },
  { label: "공간 인테리어", value: "SPACE_INTERIOR" },
  { label: "부분 인테리어", value: "PARTIAL_INTERIOR" },
];

export const EXPERT_DETAIL_CATEGORY: UserExpertCategory[] = [
  // 이사 / 운송
  { label: "원룸/소형 이사", value: "MOVE_SMALL" },
  { label: "용달/화물 운송", value: "MOVE_LARGE" },
  { label: "화물 운송", value: "FREIGHT_TRANSPORT" },
  { label: "사무실 이사", value: "OFFICE_MOVING" },
  { label: "해외 이사", value: "INTERNATIONAL_MOVING" },

  // 청소
  { label: "입주 청소", value: "MOVE_IN_CLEAN" },
  { label: "가사 청소", value: "HOUSEHOLD_CLEAN" },
  { label: "가전/가구 청소", value: "APPLIANCE_CLEAN" },
  { label: "사무실 청소", value: "OFFICE_CLEAN" },
  { label: "사업장 청소", value: "COMMERCIAL_CLEAN" },
  { label: "건물 관리", value: "BUILDING_MANAGEMENT" },
  { label: "철거/폐기", value: "DEMOLITION_DISPOSAL" },
  { label: "특수 청소", value: "SPECIAL_CLEAN" },

  // 공간 인테리어
  { label: "원룸/오피스텔 시공", value: "STUDIO_OFFICE_HOTEL_CONSTRUCTION" },
  { label: "아파트 시공", value: "APARTMENT_CONSTRUCTION" },
  { label: "사무실 시공", value: "OFFICE_CONSTRUCTION" },
  { label: "상가 시공", value: "COMMERCIAL_CONSTRUCTION" },
  { label: "주택 시공", value: "HOUSE_CONSTRUCTION" },
  { label: "집수리", value: "HOME_REPAIR" },

  // 부분 인테리어
  { label: "도배/장판/마루", value: "WALLPAPER_FLOORING" },
  { label: "욕실/주방", value: "BATH_KITCHEN" },
  { label: "타일/방수/미장", value: "TILE_WATERPROOF_PLASTER" },
  { label: "창호/샷시/중문", value: "WINDOW_SHUTTER" },
  { label: "천장/조명", value: "CEILING_LIGHTING" },
  { label: "베란다/계단/복도", value: "BALCONY_STAIRWAY_CORRIDOR" },
  { label: "단열/방음", value: "INSULATION_SOUNDPROOFING" },
  { label: "붙박이", value: "BUILT_IN_FURNITURE" },
];
