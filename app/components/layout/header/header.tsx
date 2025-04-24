"use client";

import Image from "next/image";
import NotificationIcon from "./notification";
import NavMenu from "./navMenu";
import UserMenu from "./userMenu";
import logo from "@/app/images/main_logo.svg";
import { useState } from "react";

const Header = () => {
  const [count, setCount] = useState<number>(0);
  const displayCount = count > 99 ? "99+" : count.toString();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-[80px] shadow-sm bg-white">
      <div className="max-w-screen-xl2 mx-auto flex items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center space-x-[60px]">
          <Image src={logo} alt="ZIPPLE logo" width={128} height={28} />
          <NavMenu />
        </div>

        {/* Right */}
        <div className="flex items-center space-x-6">
          <div className="text-sm text-text-primary flex items-center space-x-1">
            <span>받은 견적</span>
            <span className="flex bg-main text-white text-xs items-center justify-center w-[30px] h-[30px] rounded-full">
              {displayCount}
            </span>
          </div>
          <NotificationIcon count={5} />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
