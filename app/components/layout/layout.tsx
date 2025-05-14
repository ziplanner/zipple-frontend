"use client";

import { useEffect } from "react";
import Footer from "./footer";
import Header from "./header/header";
import { initUserInfo, refreshUserInfo } from "@/app/utils/initUser";
import { useAuthStore } from "@/app/store/authStore";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuthStore();

  const isLoggedIn = !!accessToken;

  useEffect(() => {
    if (isLoggedIn) {
      initUserInfo();
      // refreshUserInfo();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 mt-14 md:mt-[74px]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
