"use client";

import GeneralSection from "./contents/generalSection";
import ExpertSection from "./contents/expertSection";
import RepresentationSection from "./contents/representationSection";
import AssociateSection from "./contents/associateSection";
import { useRoleStore } from "@/app/store/roleStore";

const UserPage = () => {
  const currentRole = useRoleStore((state) => state.currentRole);

  const renderSection = () => {
    switch (currentRole) {
      case "GENERAL":
        return <GeneralSection />;
      case "REPRESENTATIVE":
        return <RepresentationSection />;
      case "ASSOCIATE":
        return <AssociateSection />;
      case "EXPERT":
        return <ExpertSection />;
      default:
        return <div>로그인이 필요한 서비스입니다.</div>;
    }
  };

  return <>{renderSection()}</>;
};

export default UserPage;
