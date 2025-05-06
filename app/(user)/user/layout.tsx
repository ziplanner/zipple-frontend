"use client";

import useResponsive from "@/app/hook/useResponsive";
import ProfileSection from "./contents/profileSection";
import MobileProfileSection from "./contents/mobileProfileSection";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/userStore";
import { useEffect, useState } from "react";
import AlertMessage from "@/app/components/alert/alertMessage";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isMd = useResponsive("md");

  const { user } = useUserStore();

  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    if (user?.roleName[0] === "UNREGISTERED") {
      setShowAlert(true);

      const timer = setTimeout(() => {
        router.push("/signup");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <div className="flex w-full gap-10 md:gap-0 flex-col md:flex-row max-w-screen-xl2 justify-self-center">
      {/* 왼쪽 : 프로필 영역 */}
      {isMd ? <ProfileSection /> : <MobileProfileSection />}

      {/* 오른쪽 : 라우팅에 따라 바뀌는 영역 */}
      {children}
      {showAlert && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <AlertMessage
            text="회원가입이 필요한 서비스입니다."
            onClose={() => setShowAlert(false)}
          />
        </div>
      )}
    </div>
  );
}
