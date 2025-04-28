"use client";

import useResponsive from "@/app/hook/useResponsive";
import GeneralSection from "./contents/generalSection";
import ProfileSection from "./contents/profileSection";
import MobileProfileSection from "./contents/mobileProfileSection";

const UserPage = () => {
  const isMd = useResponsive("md");

  return (
    <div className="flex w-full gap-10 md:gap-0 flex-col md:flex-row">
      {isMd ? <ProfileSection /> : <MobileProfileSection />}

      <GeneralSection />
    </div>
  );
};

export default UserPage;
