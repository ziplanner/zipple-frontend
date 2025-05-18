"use client";

import { Suspense } from "react";
import MainSection from "./content/mainSection";

export default function ServicePage() {
  return (
    <Suspense>
      <MainSection />
    </Suspense>
  );
}
