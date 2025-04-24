import Image from "next/image";
import bell_active from "@/app/images/icon/header/bell_active.svg";
import bell_inactive from "@/app/images/icon/header/bell_inactive.svg";

const NotificationIcon = ({ count }: { count: number }) => {
  const displayCount = count > 99 ? "99+" : count.toString();
  const icon = count > 0 ? bell_active : bell_inactive;

  return (
    <div className="relative w-[30px] h-[30px]">
      <Image
        src={icon}
        alt="알림 아이콘"
        width={30}
        height={30}
        className="w-[30px] h-[30px]"
      />
      {/* {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-main text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
          {displayCount}
        </span>
      )} */}
    </div>
  );
};

export default NotificationIcon;
