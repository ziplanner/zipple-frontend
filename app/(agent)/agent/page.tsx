"use client";

import { Suspense } from "react";
import MainSection from "./content/mainSection";

export default function AgentPage() {
  return (
    <Suspense>
      <MainSection />
    </Suspense>
  );
}
