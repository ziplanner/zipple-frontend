import { fetchBrokerMenuDetail } from "@/app/api/matching/api";
import useResponsive from "@/app/hook/useResponsive";
import { BrokerMenuDetailResponse } from "@/app/types/api";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import MobileProfileSection from "./mobileProfileSection";
import ProfileSection from "./profileSection";
import { BrokerDetailContext } from "@/app/context/agentDetailContext";

const LayoutSection = () => {
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
      {isMd ? <ProfileSection /> : <MobileProfileSection />}{" "}
    </BrokerDetailContext.Provider>
  );
};

export default LayoutSection;
