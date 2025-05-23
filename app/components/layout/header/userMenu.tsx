import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import defaultProfile from "@/app/images/icon/default_profile.svg";
import vector from "@/app/images/icon/header/vector.svg";
import userIcon from "@/app/images/icon/header/user.svg";
import logoutIcon from "@/app/images/icon/header/logout.svg";
import heart from "@/app/images/icon/header/heart.svg";
import { logout } from "@/app/api/login/api";
import { useUserStore } from "@/app/store/userStore";
import ErrorAlertMessage from "../../alert/errorAlertMessage";

const UserMenu = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useUserStore((state) => state.user);

  const [open, setOpen] = useState<boolean>(false);
  const [alertErrorText, setAlertErrorText] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
      setAlertErrorText("로그아웃에 실패했습니다.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex gap-2.5 items-center lg:space-x-2 md:space-x-1"
      >
        <div className="w-8 h-8 lg:w-8 lg:h-8 rounded-full overflow-hidden">
          <Image
            src={user?.profileUrl || defaultProfile}
            alt="profile"
            width={28}
            height={28}
            className="object-cover w-full h-full"
          />
        </div>
        <span className="text-text-primary lg:text-16m md:text-14m">
          {user?.nickname || "회원"}님
        </span>
        <Image
          src={vector}
          alt="Chevron icon"
          width={10}
          height={10}
          className={`transition-transform duration-300 ${
            open ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute border border-background-light right-0 mt-2 w-40
          bg-white shadow-md rounded-md p-2 text-sm z-50 text-text-menu text-16r"
        >
          <Link
            href="/user"
            className="block px-2.5 py-2 hover:bg-background-extraSoft rounded-md"
          >
            <div className="flex gap-2.5 items-center">
              <Image src={userIcon} alt="마이페이지" width={20} height={20} />
              마이페이지
            </div>
          </Link>

          <Link
            href="#"
            className="block px-2.5 py-2 hover:bg-background-extraSoft rounded-md"
          >
            <div className="flex gap-2.5 items-center">
              <Image src={heart} alt="찜 목록" width={20} height={20} />찜 목록
            </div>
          </Link>

          <div className="block px-2.5 py-2 hover:bg-background-extraSoft rounded-md">
            <div
              className="flex gap-2.5 items-center cursor-pointer"
              onClick={handleLogout}
            >
              <Image src={logoutIcon} alt="로그아웃" width={20} height={20} />
              로그아웃
            </div>
          </div>
        </div>
      )}
      {alertErrorText && (
        <ErrorAlertMessage
          text={alertErrorText}
          onClose={() => setAlertErrorText(null)}
        />
      )}
    </div>
  );
};

export default UserMenu;
