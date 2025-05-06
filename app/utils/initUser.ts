import { getUserRole } from "../api/login/api";
import { useUserStore } from "../store/userStore";

export const initUserInfo = async () => {
  const user = useUserStore.getState().user;

  if (!user) {
    try {
      const data = await getUserRole();
      useUserStore.getState().setUser(data);
      console.log(data);
    } catch (error) {
      console.error("유저 정보 조회 실패", error);
    }
  }
};
