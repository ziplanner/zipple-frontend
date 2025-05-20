import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRoleType =
  | "GENERAL"
  | "REPRESENTATIVE"
  | "ASSOCIATE"
  | "EXPERT";

export interface RoleStoreState {
  currentRole: UserRoleType | null;
  availableRoles: UserRoleType[];
  setCurrentRole: (role: UserRoleType) => void;
  setAvailableRoles: (roles: UserRoleType[]) => void;
}

export const useRoleStore = create<RoleStoreState>()(
  persist(
    (set, get) => ({
      currentRole: null,
      availableRoles: [],
      setCurrentRole: (role) => set({ currentRole: role }),
      setAvailableRoles: (roles) =>
        set({
          availableRoles: roles,
          currentRole: get().currentRole ?? roles[0] ?? null,
        }),
    }),
    {
      name: "role-store",
    }
  )
);
