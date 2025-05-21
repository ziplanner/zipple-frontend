"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MENU_BY_ROLE } from "@/app/data/menu";
import { UserRoleType } from "@/app/store/roleStore";

interface UserMenuProps {
  role: UserRoleType | null;
}

const UserMenu = ({ role }: UserMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // 역할별 메뉴 목록 가져오기
  const menuList = useMemo(() => {
    if (role) {
      return MENU_BY_ROLE[role] ?? [];
    }
    return [];
  }, [role]);

  // 현재 URL과 가장 잘 맞는 메뉴 path 찾기
  const currentMenuPath = useMemo(() => {
    return menuList.find((item) => pathname === item.path)?.path ?? "";
  }, [pathname, menuList]);

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-full min-h-[420px]">
      <ul className="flex flex-col gap-6 justify-start">
        {menuList.map((menuItem, index) => (
          <li
            key={index}
            className={`text-18m ${
              currentMenuPath === menuItem.path
                ? "text-text-primary"
                : "text-text-secondary"
            } relative cursor-pointer`}
            onClick={() => handleMenuClick(menuItem.path)}
          >
            <div className="relative inline-flex items-center">
              {menuItem.label}
              {currentMenuPath === menuItem.path && (
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
