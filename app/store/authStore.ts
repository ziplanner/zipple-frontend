import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isRegistered: boolean;
  setAuth: (data: {
    accessToken: string;
    refreshToken: string;
    isRegistered: boolean;
  }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isRegistered: false,
      setAuth: ({ accessToken, refreshToken, isRegistered }) =>
        set({ accessToken, refreshToken, isRegistered }),
      logout: () =>
        set({ accessToken: null, refreshToken: null, isRegistered: false }),
    }),
    {
      name: "zipple-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : undefined!
      ),
    }
  )
);
