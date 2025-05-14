"use client";

import { Suspense } from "react";
import LayoutSection from "./content/layoutSection";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <div
        className="flex w-full gap-10 md:gap-0 flex-col px-[15px] md:px-0
      md:flex-row max-w-screen-xl2 justify-self-center"
      >
        <LayoutSection />
        {children}
      </div>
    </Suspense>
  );
}
