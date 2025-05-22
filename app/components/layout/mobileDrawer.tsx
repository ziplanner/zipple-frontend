import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import menu from "@/app/images/icon/header/menu.svg";
import close from "@/app/images/icon/close.svg";
import heart from "@/app/images/icon/header/heart.svg";
import userIcon from "@/app/images/icon/header/user.svg";
import logoutIcon from "@/app/images/icon/logout.svg";
import defaultProfile from "@/app/images/icon/default_profile.svg";
import { useUserStore } from "@/app/store/userStore";
import { logout } from "@/app/api/login/api";
import ErrorAlertMessage from "../alert/errorAlertMessage";
import clsx from "clsx";

const MobileDrawer = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const [open, setOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [alertErrorText, setAlertErrorText] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
      setAlertErrorText("로그아웃에 실패했습니다.");
    }
  };

  const menuItems = [
    { label: "중개사매칭", path: "/agent" },
    { label: "생활서비스", path: "/service" },
    { label: "집플래너", path: "/planner" },
    { label: "커뮤니티", path: "/community" },
    { label: "고객안내", path: "/guide" },
  ];

  const openDrawer = () => {
    setIsVisible(true);
    setTimeout(() => setOpen(true), 10);
  };

  const closeDrawer = () => {
    setOpen(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  return (
    <>
      <button onClick={openDrawer}>
        <Image src={menu} alt="menu" width={24} height={24} />
      </button>

      {isVisible && (
        <div className="fixed inset-0 z-50 bg-black/30 transition-opacity duration-300">
          <div
            className={clsx(
              "absolute top-0 right-0 w-[96%] h-full bg-white shadow-lg flex flex-col transition-transform duration-300 transform",
              open ? "translate-x-0" : "translate-x-full"
            )}
          >
            {/* 닫기 버튼 */}
            <div className="flex justify-between items-center px-[15px] py-[18px]">
              <div className="flex items-center gap-2.5">
                <Image
                  src={user?.profileUrl || defaultProfile}
                  alt="user"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-text-primary text-16m">
                  {user?.nickname || "비회원"}님
                </span>
              </div>
              <button onClick={closeDrawer}>
                <Image src={close} alt="close" width={20} height={20} />
              </button>
            </div>

            {/* 상단 버튼 */}
            <div className="flex w-full gap-[15px] mb-5 px-[15px] text-text-menu text-14r">
              <button
                className="flex-1 rounded-md py-2.5 flex items-center justify-center gap-1 bg-background-extraSoft"
                onClick={() => {
                  router.push("/user");
                  closeDrawer();
                }}
              >
                <Image src={userIcon} alt="user" width={20} height={20} />
                마이페이지
              </button>
              <button
                className="flex-1 rounded-md py-2.5 flex items-center justify-center gap-1 bg-background-extraSoft"
                onClick={() => {
                  router.push("/scraps");
                  closeDrawer();
                }}
              >
                <Image src={heart} alt="heart" width={20} height={20} />찜 목록
              </button>
            </div>

            {/* 메뉴 목록 */}
            <ul className="flex-1 flex flex-col px-[15px]">
              {menuItems.map((item) => (
                <li
                  key={item.path}
                  className="text-16r text-text-primary cursor-pointer py-[18px]"
                  onClick={() => {
                    router.push(item.path);
                    closeDrawer();
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>

            {/* 하단 */}
            <div className="border-t">
              <button
                className="flex flex-row gap-[6px] items-center text-left text-16r text-text-menu pl-[15px] py-5"
                onClick={handleLogout}
              >
                <Image src={logoutIcon} alt="logout" width={20} height={20} />
                <p> 로그아웃</p>
              </button>
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
    </>
  );
};

export default MobileDrawer;
