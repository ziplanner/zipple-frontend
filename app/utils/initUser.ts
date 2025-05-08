import { getUserRole } from "../api/login/api";
import { useUserStore } from "../store/userStore";

export const initUserInfo = async () => {
  const user = useUserStore.getState().user;

  if (user === null || user === undefined || user.roleName.length === 0) {
    try {
      const data = await getUserRole();
      useUserStore.getState().setUser(data);
      console.log("유저 데이터", data);
    } catch (error) {
      console.error("유저 정보 조회 실패", error);
    }
  }
};

export const refreshUserInfo = async () => {
  try {
    const data = await getUserRole();
    useUserStore.getState().setUser(data);
    console.log("유저 데이터 갱신", data);
  } catch (error) {
    console.error("유저 정보 조회 실패", error);
  }
};
