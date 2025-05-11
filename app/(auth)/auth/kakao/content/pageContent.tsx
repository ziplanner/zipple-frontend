"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import LoginLoading from "./loginLoading";
import { loginWithKakao } from "@/app/api/login/api";
import { refreshUserInfo } from "@/app/utils/initUser";

export default function SignInPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const kakaoCode = searchParams.get("code");
    if (!kakaoCode) return;

    const login = async () => {
      try {
        const res = await loginWithKakao(kakaoCode);

        if (res.isRegistered) {
          refreshUserInfo();
          router.replace("/"); // 이미 가입된 경우
        } else {
          refreshUserInfo();
          router.replace("/signup"); // 미가입자 추가정보 등록 페이지로
        }
      } catch (err) {
        alert("로그인 중 문제가 발생했습니다.");
        router.replace("/"); // 에러 시 홈으로 리다이렉트
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
