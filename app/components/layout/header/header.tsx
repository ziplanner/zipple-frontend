"use client";

import Image from "next/image";
import NotificationIcon from "./notification";
import NavMenu from "./navMenu";
import UserMenu from "./userMenu";
import logo from "@/app/images/main_logo.svg";
import menu from "@/app/images/icon/header/menu.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BlueBtn } from "../../button/blueBtn";
import SignupModal from "../../modal/kakao/signupModal";
import useResponsive from "@/app/hook/useResponsive";
import bar from "@/app/images/icon/footer/bar.svg";
import { useAuthStore } from "@/app/store/authStore";

const Header = () => {
  const router = useRouter();
  const isMd = useResponsive("md");

  const [count, setCount] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // 로그인 상태
  const { accessToken } = useAuthStore();

  const isLoggedIn = !!accessToken;
  const displayCount = count > 99 ? "99+" : count.toString();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 md:py-4 px-[15px] lx:px-20 shadow-sm bg-white">
      <div className="md:max-w-screen-xl2 md:mx-auto flex items-center justify-between px-0 md:px-4">
        {/* Left */}
        <div className="flex items-center lg:space-x-[60px] md:space-x-8">
          <Image
            src={logo}
            alt="ZIPPLE"
            width={100}
            height={22}
            onClick={() => {
              router.push("/");
            }}
            className="cursor-pointer md:w-[128px] md:h-7"
          />
          {isMd && <NavMenu />}
        </div>

        {/* Right */}
        {!isLoggedIn ? (
          <BlueBtn
            text={"로그인 / 회원가입"}
            onClick={() => setOpenModal(true)}
          />
        ) : (
          <div className="flex items-center md:space-x-6">
            <div
              className="text-text-primary flex items-center space-x-1 md:space-x-2 cursor-pointer"
              onClick={() => {
                router.push("/estimate");
              }}
            >
              <span className="text-12m md:text-14m lg:text-16m">
                받은 견적
              </span>
              <span className="flex bg-main text-white text-12s md:text-14r items-center justify-center w-6 h-6 lg:w-[30px] lg:h-[30px] md:w-7 md:h-7 rounded-full">
                {displayCount}
              </span>
            </div>
            {!isMd && (
              <Image
                src={bar}
                alt="bar"
                width={1}
                height={10}
                className="mx-2.5"
              />
            )}
            <NotificationIcon count={5} />
            {!isMd && (
              <Image
                src={bar}
                alt="bar"
                width={1}
                height={10}
                className="mx-2.5"
              />
            )}
            {isMd ? (
              <UserMenu />
            ) : (
              <Image src={menu} alt={"menu"} width={24} height={24} />
            )}
          </div>
        )}
      </div>

      {openModal && <SignupModal onClose={() => setOpenModal(false)} />}
    </header>
  );
};

export default Header;
