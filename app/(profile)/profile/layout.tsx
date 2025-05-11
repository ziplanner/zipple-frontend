"use client";

import useResponsive from "@/app/hook/useResponsive";
import ProfileSection from "./content/profileSection";
import MobileProfileSection from "./content/mobileProfileSection";
import { fetchBrokerMenuDetail } from "@/app/api/matching/api";
import { BrokerMenuDetailResponse } from "@/app/types/api";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { BrokerDetailContext } from "@/app/context/agentDetailContext";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMd = useResponsive("md");
  const params = useSearchParams();
  const brokerId = Number(params.get("id"));

  const [data, setData] = useState<BrokerMenuDetailResponse | null>(null);

  useEffect(() => {
    if (!brokerId) return;
    const load = async () => {
      try {
        const res = await fetchBrokerMenuDetail(brokerId);
        setData(res);
      } catch (e) {
        console.error("중개사 상세 조회 실패", e);
      }
    };
    load();
  }, [brokerId]);

  if (!data) return null;

  return (
    <BrokerDetailContext.Provider value={data}>
      <div className="flex w-full gap-10 md:gap-0 flex-col md:flex-row max-w-screen-xl2 justify-self-center">
        {isMd ? <ProfileSection /> : <MobileProfileSection />}
        {children}
      </div>
    </BrokerDetailContext.Provider>
  );
}
