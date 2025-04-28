import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import avatar from "@/app/images/icon/header/avatar.svg";
import vector from "@/app/images/icon/header/vector.svg";
import user from "@/app/images/icon/header/user.svg";
import logout from "@/app/images/icon/header/logout.svg";
import heart from "@/app/images/icon/header/heart.svg";

const UserMenu = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);

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
        <Image
          src={avatar}
          alt="User avatar"
          width={28}
          height={28}
          className="rounded-full lg:w-8 lg:h-8"
        />
        <span className="text-text-primary lg:text-16m md:text-14m">
          홍길동님
        </span>
        <Image
          src={vector}
          alt="Chevron icon"
          width={10}
          height={10}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute border border-background-light right-0 mt-2 w-40
          bg-white shadow-md rounded-md p-2 text-sm z-50 text-text-menu text-16r"
        >
          <Link
            href="#"
            className="block px-2.5 py-2 hover:bg-background-extraSoft rounded-md"
          >
            <div className="flex gap-2.5 items-center">
              <Image src={user} alt="마이페이지" width={20} height={20} />
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

          <Link
            href="#"
            className="block px-2.5 py-2 hover:bg-background-extraSoft rounded-md"
          >
            <div className="flex gap-2.5 items-center">
              <Image src={logout} alt="로그아웃" width={20} height={20} />
              로그아웃
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
