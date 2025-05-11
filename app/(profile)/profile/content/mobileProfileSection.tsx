import { useState } from "react";
import Image from "next/image";
import defaultProfile from "@/app/images/icon/default_profile.svg";
import phone from "@/app/images/icon/phone.svg";
import RoleToken from "@/app/components/token/roleToken";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useBrokerDetail } from "@/app/context/agentDetailContext";
import { formatPhoneNumber } from "@/app/utils/phoneNumber";

const MobileProfileSection = () => {
  const data = useBrokerDetail();

  const [liked, setLiked] = useState<boolean>(false);

  return (
    <div className="w-full p-[30px] pb-5 border border-border rounded-[20px] mt-5">
      <div className="flex flex-col w-full items-center">
        <div className="flex gap-4 items-center justify-center">
          <Image
            src={data?.profileUrl || defaultProfile}
            alt="User"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <div className="flex gap-2">
              <p className="text-text-primary text-18m">{data?.nickname}</p>
              <RoleToken role={data?.roleName || "GENERAL"} />
            </div>
            {/* Badges */}
            {/* <div className="flex gap-[6px] mt-2.5">
              {["대표", "1인 가구 전문가"].map((badge, i) => (
                <span
                  key={i}
                  className="bg-yellow-100 text-yellow-700 text-12 m px-2 py-0.5 rounded-md"
                >
                  {badge}
                </span>
              ))}
            </div> */}
          </div>
        </div>
        {/* 핸드폰 번호 */}
        <div className="w-fit">
          <button
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4
    rounded-md border border-main mt-5 text-nowrap"
            onClick={() => {}}
          >
            <Image src={phone} alt="phone" width={20} height={20} />
            <p className="text-main text-16m">
              {" "}
              {data?.phoneNumber
                ? formatPhoneNumber(data.phoneNumber)
                : "번호 비공개"}
            </p>
          </button>
        </div>

        {/* Like Button */}
        <div className="flex flex-col items-center justify-center mt-5">
          {liked ? (
            <FaHeart className="text-error text-[26px]" />
          ) : (
            <FaRegHeart className="text-text-light text-[26px]" />
          )}
          <span
            className={`text-12m lg:text-14m ${
              data?.likesCount || 0 > 0 ? "text-error" : "text-text-light"
            }`}
          >
            {data?.likesCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileProfileSection;
