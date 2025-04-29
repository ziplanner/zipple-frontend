"use client";

import { useState } from "react";
import GeneralSection from "./contents/generalSection";
import AgentSection from "./contents/agentSection";
import ExpertSection from "./contents/expertSection";

const UserPage = () => {
  const [role, setRole] = useState<
    "GENERAL" | "REPRESENTATION" | "ASSOCIATE" | "EXPERT" | "NONE"
  >("REPRESENTATION");

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
