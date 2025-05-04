import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import avatar from "@/app/images/icon/header/avatar.svg";
import phone from "@/app/images/icon/phone.svg";
import RoleToken from "@/app/components/token/roleToken";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ProfileSection = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("권수연");
  const [avatarSrc, setAvatarSrc] = useState<string | StaticImageData>(avatar);
  const [liked, setLiked] = useState<boolean>(true);
  const [likeCount, setLikeCount] = useState<number>(12);

  return (
    <div
      className="md:w-[280px] lx:w-[340px] md:pt-5 md:px-12 lx:py-10 lx:px-[60px]
    border border-border rounded-[20px] md:ml-8 lg:ml-20 md:mt-10 lg:mt-20"
    >
      <div className="flex flex-col w-full items-center">
        <div className="md:w-[180px] md:h-[180px] lx:w-[220px] lx:h-[220px]">
          <Image
            src={avatarSrc}
            alt="User"
            width={180}
            height={180}
            className="rounded-full md:w-[180px] md:h-[180px] lx:w-[220px] lx:h-[220px]"
          />
        </div>
        <p className="text-text-primary text-24m mb-[6px] mt-5">{name}</p>
        <RoleToken role={"REPRESENTATION"} />
        {/* Badges */}
        <div className="flex flex-wrap justify-end gap-2 mt-5">
          {["대표", "1인 가구 전문가"].map((badge, i) => (
            <span
              key={i}
              className="bg-yellow-100 text-yellow-700 text-12 m px-2 py-0.5 rounded-md"
            >
              {badge}
            </span>
          ))}
        </div>
        {/* 핸드폰 번호 */}
        <button
          className="flex w-full items-center justify-center py-2.5 gap-1.5 
          rounded-md border border-main mt-[74px] text-nowrap"
          onClick={() => {}}
        >
          <Image
            src={phone}
            alt={"phone"}
            width={20}
            height={20}
            className="md:w-5 md:h-5"
          />
          <p className="text-main text-18m">010-1234-5678</p>
        </button>
        {/* Like Button */}
        <div className="flex flex-col items-center justify-center mt-5">
          {liked ? (
            <FaHeart className="text-error text-[26px]" />
          ) : (
            <FaRegHeart className="text-text-light text-[26px]" />
          )}
          <span
            className={`text-12m lg:text-14m ${
              likeCount > 0 ? "text-error" : "text-text-light"
            }`}
          >
            {likeCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
