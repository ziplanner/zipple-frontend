import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserRoleResponse } from "../api/login/api";

interface UserState {
  user: UserRoleResponse | null;
  setUser: (user: UserRoleResponse) => void;
  clearUser: () => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "user-store",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined!,
      // persist가 복원된 직후 실행
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
