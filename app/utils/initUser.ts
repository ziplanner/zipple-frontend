import { getUserRole } from "../api/login/api";
import { RoleStoreState, useRoleStore } from "../store/roleStore";
import { useUserStore } from "../store/userStore";

export const initUserInfo = async () => {
  const user = useUserStore.getState().user;

  if (!user || user.roleName.length === 0) {
    try {
      const data = await getUserRole();
      useUserStore.getState().setUser(data);

      // 역할 스토어 초기화
      const roles = data.roleName as RoleStoreState["availableRoles"];
      useRoleStore.getState().setAvailableRoles(roles);

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

    // 역할 스토어 초기화
    const roles = data.roleName as RoleStoreState["availableRoles"];
    useRoleStore.getState().setAvailableRoles(roles);
    console.log("유저 데이터", data);

    return data;
  } catch (error) {
    console.error("유저 정보 조회 실패", error);
    return null;
  }
};
