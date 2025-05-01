"use client";

import { useMemo } from "react";
import { useRole } from "@/app/context/roleContextProvider";
import { usePathname, useRouter } from "next/navigation";
import { MENU_BY_ROLE } from "@/app/data/menu";

const MobileUserMenu = () => {
  const { role } = useRole();
  const pathname = usePathname();
  const router = useRouter();

  const menuList = useMemo(() => {
    return MENU_BY_ROLE[role] ?? [];
  }, [role]);

  // 현재 URL에 가장 잘 맞는 path 선택 (정확 일치 > 포함 > fallback)
  const currentMenuPath = useMemo(() => {
    return menuList.find((item) => pathname === item.path)?.path ?? "";
  }, [pathname, menuList]);

  // const currentMenuPath = useMemo(() => {
  //   const exactMatch = menuList.find((menu) => pathname === menu.path);
  //   if (exactMatch) return exactMatch.path;

  //   const partialMatch = menuList
  //     .sort((a, b) => b.path.length - a.path.length) // 긴 path 우선
  //     .find((menu) => pathname.startsWith(menu.path));

  //   return partialMatch?.path ?? "";
  // }, [pathname, menuList]);

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-full">
      <ul className="flex gap-5 justify-start items-center">
        {menuList.map((menuItem, index) => (
          <li
            key={index}
            className={`${
              currentMenuPath === menuItem.path
                ? "text-text-primary text-16s"
                : "text-text-secondary text-14m"
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
      <div className="border-b border-background-light w-full mt-[14px]" />
    </div>
  );
};

export default MobileUserMenu;
