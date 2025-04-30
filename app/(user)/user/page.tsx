"use client";

import GeneralSection from "./contents/generalSection";
import AgentSection from "./contents/agentSection";
import ExpertSection from "./contents/expertSection";
import { useRole } from "@/app/context/roleContextProvider";

const UserPage = () => {
  const { role } = useRole();

  const renderSection = () => {
    switch (role) {
      case "GENERAL":
        return <GeneralSection />;
      case "REPRESENTATION":
        return <AgentSection />;
      case "ASSOCIATE":
        return <AgentSection />;
      case "EXPERT":
        return <ExpertSection />;
      default:
        return <div>로그인이 필요한 서비스입니다.</div>;
    }
  };

  return <>{renderSection()}</>;
};

export default UserPage;
