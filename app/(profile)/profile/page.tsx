"use client";

import { Suspense } from "react";
import InfoSection from "./content/infoSection";

const ProfilePage = () => {
  return (
    <Suspense>
      <div className="w-full">
        <InfoSection />
      </div>
    </Suspense>
  );
};

export default ProfilePage;
