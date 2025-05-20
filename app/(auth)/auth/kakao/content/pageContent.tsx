"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import LoginLoading from "./loginLoading";
import { loginWithKakao } from "@/app/api/login/api";
import { refreshUserInfo } from "@/app/utils/initUser";
import { useRoleStore, UserRoleType } from "@/app/store/roleStore";

export default function SignInPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const kakaoCode = searchParams.get("code");
    if (!kakaoCode) return;

    const login = async () => {
      try {
        const res = await loginWithKakao(kakaoCode);

        const user = await refreshUserInfo();

        if (user) {
          // 타입 필터링
          const validRoles = user.roleName.filter(
            (role): role is UserRoleType =>
              ["GENERAL", "REPRESENTATIVE", "ASSOCIATE", "EXPERT"].includes(
                role
              )
          );

          // 역할 스토어 설정
          useRoleStore.getState().setAvailableRoles(validRoles);
          useRoleStore.getState().setCurrentRole(validRoles[0]);
        }

        router.replace(res.isRegistered ? "/" : "/signup");
      } catch (err) {
        alert("로그인 중 문제가 발생했습니다.");
        router.replace("/");
      }
    };

    login();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen">
      <LoginLoading />
    </div>
  );
}
