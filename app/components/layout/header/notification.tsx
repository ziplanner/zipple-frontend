import Image from "next/image";
import bell_active from "@/app/images/icon/header/bell_active.svg";
import bell_inactive from "@/app/images/icon/header/bell_inactive.svg";

const NotificationIcon = ({ count }: { count: number }) => {
  const displayCount = count > 99 ? "99+" : count.toString();
  const icon = count > 0 ? bell_active : bell_inactive;

  return (
    <div className="relative w-6 h-6 lg:w-[30px] lg:h-[30px] md:w-7 md:h-7">
      <Image
        src={icon}
        alt="알림 아이콘"
        width={24}
        height={24}
        className="lg:w-[30px] lg:h-[30px] md:w-7 md:h-7"
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
