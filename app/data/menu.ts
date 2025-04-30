export interface UserMenuItem {
  label: string;
  path: string;
}

export const GENERAL_USER_MENU: UserMenuItem[] = [
  { label: "나의 정보", path: "/user" },
  { label: "집플래너 서비스", path: "/user/planner" },
  { label: "커뮤니티", path: "/user/community" },
];

export const AGENT_USER_MENU: UserMenuItem[] = [
  { label: "나의 정보", path: "/user" },
  { label: "부동산 정보", path: "/user/property" },
  { label: "포토폴리오 관리", path: "/user/portfolio" },
  { label: "후기 보기", path: "/user/reviews" },
  { label: "집플래너 서비스", path: "/user/planner" },
  { label: "커뮤니티", path: "/user/community" },
];

export const EXPERT_USER_MENU: UserMenuItem[] = [
  { label: "나의 정보", path: "/user" },
  { label: "사업자 정보", path: "/user/business" },
  { label: "포토폴리오 관리", path: "/user/portfolio" },
  { label: "후기 보기", path: "/user/reviews" },
  { label: "집플래너 서비스", path: "/user/planner" },
  { label: "커뮤니티", path: "/user/community" },
];

export const MENU_BY_ROLE: Record<string, UserMenuItem[]> = {
  GENERAL: GENERAL_USER_MENU,
  REPRESENTATION: AGENT_USER_MENU,
  ASSOCIATE: AGENT_USER_MENU,
  EXPERT: EXPERT_USER_MENU,
};
