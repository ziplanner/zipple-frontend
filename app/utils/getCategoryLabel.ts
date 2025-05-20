import {
  CATEGORY,
  EXPERT_CATEGORY,
  EXPERT_DETAIL_CATEGORY,
} from "../data/category";

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
