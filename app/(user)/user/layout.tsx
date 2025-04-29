"use client";

import useResponsive from "@/app/hook/useResponsive";
import ProfileSection from "./contents/profileSection";
import MobileProfileSection from "./contents/mobileProfileSection";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMd = useResponsive("md");

  return (
    <div className="flex w-full gap-10 md:gap-0 flex-col md:flex-row">
      {/* 왼쪽 : 프로필 영역 */}
      {isMd ? <ProfileSection /> : <MobileProfileSection />}

      {/* 오른쪽 : 라우팅에 따라 바뀌는 영역 */}
      {children}
    </div>
  );
}
