"use client";

import { ExpertSignupProvider } from "@/app/context/expertSignupProvider";
import ExpertSignupMainContent from "./content/main";

const ExpertSignupPage = () => {
  return (
    <ExpertSignupProvider>
      <ExpertSignupMainContent />
    </ExpertSignupProvider>
  );
};

export default ExpertSignupPage;
