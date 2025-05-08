import { useAuthStore } from "@/app/store/authStore";
import axiosInstance from "../axiosInstance";
import {
  LOGIN,
  LOGOUT,
  RENEW,
  ROLE,
  WITHDRAW,
  WITHDRAW_USERTYPE,
} from "../apiUrl";

export interface UserRoleResponse {
  userId: number;
  roleName: string[];
  nickname: string;
  profileUrl: string;
}

// kakao 로그인
export const loginWithKakao = async (authorizationCode: string) => {
  try {
    const response = await axiosInstance.post(LOGIN, {
      authorizationCode,
    });

    const { accessToken, refreshToken, isRegistered } = response.data;

    // Zustand 저장
    useAuthStore
      .getState()
      .setAuth({ accessToken, refreshToken, isRegistered });

    return response.data;
  } catch (error) {
    console.error("카카오 로그인 실패", error);
    throw error;
  }
};

// token 재발급
export const refreshToken = async (): Promise<string | null> => {
  const refreshToken = useAuthStore.getState().refreshToken;
  if (!refreshToken) return null;

  try {
    const response = await axiosInstance.post(RENEW, {
      refreshToken,
    });

    return response.data.accessToken;
  } catch (error) {
    console.error("리프레시 토큰으로 재발급 실패", error);
    return null;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    // 서버에 로그아웃 요청
    await axiosInstance.patch(LOGOUT);

    // 상태 초기화
    useAuthStore.getState().logout();

    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  } catch (error) {
    console.error("로그아웃 실패", error);
    throw error;
  }
};

// 회원정보 조회
export const getUserRole = async (): Promise<UserRoleResponse> => {
  const response = await axiosInstance.get(ROLE);
  return response.data;
};

// 서비스 회원 탈퇴
export const withdrawAll = async (): Promise<void> => {
  await axiosInstance.delete(WITHDRAW);
};

// 부분 회원 탈퇴
export const withdrawPartial = async (): Promise<void> => {
  await axiosInstance.delete(WITHDRAW_USERTYPE);
};
