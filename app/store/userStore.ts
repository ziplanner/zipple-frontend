import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserRoleResponse } from "../api/login/api";

interface UserState {
  user: UserRoleResponse | null;
  setUser: (user: UserRoleResponse) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-store",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined!,
    }
  )
);
