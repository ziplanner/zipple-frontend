"use client";

import { AgentSignupProvider } from "@/app/context/agentSignupProvider";
import AgentSignupMainContent from "./content/main";

const AgentSignupPage = () => {
  return (
    <AgentSignupProvider>
      <AgentSignupMainContent />
    </AgentSignupProvider>
  );
};

export default AgentSignupPage;
