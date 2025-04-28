import { useState } from "react";

const GENERAL_USER_MENU = ["나의 정보", "집플래너 서비스", "커뮤니티"];
const AGENT_USER_MENU = [
  "나의 정보",
  "부동산 정보",
  "포토폴리오 관리",
  "후기 보기",
  "집플래너 서비스",
  "커뮤니티",
];
const EXPERT_USER_MENU = [
  "나의 정보",
  "사업자 정보",
  "포토폴리오 관리",
  "후기 보기",
  "집플래너 서비스",
  "커뮤니티",
];

const MobileUserMenu = () => {
  const [role, setRole] = useState<"GENERAL" | "AGENT" | "EXPERT">("GENERAL");
  const [selectedMenu, setSelectedMenu] = useState<string>("");

  // role에 따라 보여줄 메뉴를 선택
  const getMenu = () => {
    if (role === "AGENT") return AGENT_USER_MENU;
    if (role === "EXPERT") return EXPERT_USER_MENU;
    return GENERAL_USER_MENU;
  };

  // 메뉴 항목 클릭 시 선택된 메뉴로 업데이트
  const handleMenuClick = (menuItem: string) => {
    setSelectedMenu(menuItem);
  };

  return (
    <div className="w-full">
      {/* role에 맞는 메뉴 항목을 표시 */}
      <ul className="flex gap-5 justify-start items-center">
        {getMenu().map((menuItem, index) => (
          <li
            key={index}
            className={`${
              selectedMenu === menuItem
                ? "text-text-primary text-16s"
                : "text-text-secondary text-14m"
            } relative cursor-pointer`}
            onClick={() => handleMenuClick(menuItem)}
          >
            <div className="relative inline-flex items-center">
              {menuItem}
              {selectedMenu === menuItem && (
                <span className="absolute top-0 right-[-10px] w-[6px] h-[6px] bg-sub rounded-full" />
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="border-b border-background-light w-full mt-[14px]" />
    </div>
  );
};

export default MobileUserMenu;
