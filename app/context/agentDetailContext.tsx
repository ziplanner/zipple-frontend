"use client";

import { createContext, useContext } from "react";
import { BrokerMenuDetailResponse } from "@/app/types/api";

export const BrokerDetailContext =
  createContext<BrokerMenuDetailResponse | null>(null);

export const useBrokerDetail = () => {
  const context = useContext(BrokerDetailContext);
  if (!context) {
    console.warn("useBrokerDetail must be used within a BrokerDetailProvider");
  }
  return context;
};
