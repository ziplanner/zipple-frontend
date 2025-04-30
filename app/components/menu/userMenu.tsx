import { useRole } from "@/app/context/roleContextProvider";
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

const UserMenu = () => {
  const { role } = useRole();

  const [selectedMenu, setSelectedMenu] = useState<string>("");

  // role에 따라 보여줄 메뉴를 선택
  const getMenu = () => {
    if (role === "REPRESENTATION" || role === "ASSOCIATE")
      return AGENT_USER_MENU;
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
      <ul className="flex flex-col gap-6 justify-start">
        {getMenu().map((menuItem, index) => (
          <li
            key={index}
            className={`text-18m ${
              selectedMenu === menuItem
                ? "text-text-primary"
                : "text-text-secondary"
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
    </div>
  );
};

export default UserMenu;
