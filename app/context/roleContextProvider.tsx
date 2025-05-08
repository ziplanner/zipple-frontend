"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type RoleType = "GENERAL" | "REPRESENTATIVE" | "ASSOCIATE" | "EXPERT" | "NONE";

interface RoleContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<RoleType>("GENERAL");
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
