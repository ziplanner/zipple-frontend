"use client";

import GeneralSection from "./contents/generalSection";
import ProfileSection from "./contents/profileSection";

const UserPage = () => {
  return (
    <div className="flex w-full">
      <ProfileSection />
      <GeneralSection />
    </div>
  );
};

export default UserPage;
