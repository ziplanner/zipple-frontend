import { create } from "zustand";

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

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isRegistered: false,
  setAuth: ({ accessToken, refreshToken, isRegistered }) =>
    set({ accessToken, refreshToken, isRegistered }),
  logout: () =>
    set({ accessToken: null, refreshToken: null, isRegistered: false }),
}));
