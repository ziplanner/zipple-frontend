import { useState } from "react";
import Image from "next/image";
import defaultProfile from "@/app/images/icon/default_profile.svg";
import phone from "@/app/images/icon/phone.svg";
import RoleToken from "@/app/components/token/roleToken";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useBrokerDetail } from "@/app/context/agentDetailContext";
import { formatPhoneNumber } from "@/app/utils/phoneNumber";
import { likeReceiver, unlikeReceiver } from "@/app/api/matching/api";
import { useSearchParams } from "next/navigation";

const ProfileSection = () => {
  const data = useBrokerDetail();
  const param = useSearchParams();
  const brokerId = param.get("id");

  const [liked, setLiked] = useState<boolean>(data?.isLiked ?? false);
  const [likesCount, setLikesCount] = useState<number>(data?.likesCount ?? 0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLikeClick = async () => {
    if (!brokerId || isLoading) return;

    const parsedBrokerId = parseInt(brokerId, 10);

    setIsLoading(true);

    try {
      if (liked) {
        await unlikeReceiver(parsedBrokerId);
        setLiked(false);
        setLikesCount((prev) => Math.max(prev - 1, 0));
      } else {
        await likeReceiver(parsedBrokerId);
        setLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("좋아요 처리 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="md:w-[280px] lx:w-[340px] md:pt-5 md:px-12 lx:py-10 lx:px-[60px]
    border border-border rounded-[20px] md:ml-8 lg:ml-20 md:mt-10 lg:mt-20"
    >
      <div className="flex flex-col w-full items-center">
        <div className="md:w-[180px] md:h-[180px] lx:w-[220px] lx:h-[220px] rounded-full overflow-hidden">
          <Image
            src={data?.profileUrl || defaultProfile}
            alt="User"
            width={180}
            height={180}
            className="object-cover w-full h-full md:w-[180px] md:h-[180px] lx:w-[220px] lx:h-[220px]"
          />
        </div>
        <p className="text-text-primary text-24m mb-[6px] mt-5">
          {data?.nickname}
        </p>
        <RoleToken role={data?.roleName || "GENERAL"} />
        {/* Badges */}
        {/* <div className="flex flex-wrap justify-end gap-2 mt-5">
          {["대표", "1인 가구 전문가"].map((badge, i) => (
            <span
              key={i}
              className="bg-yellow-100 text-yellow-700 text-12 m px-2 py-0.5 rounded-md"
            >
              {badge}
            </span>
          ))}
        </div> */}
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
          <p className="text-main text-18m">
            {data?.phoneNumber
              ? formatPhoneNumber(data.phoneNumber)
              : "번호 비공개"}
          </p>
        </button>
        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          disabled={isLoading}
          className="flex flex-col items-center justify-center mt-5"
        >
          {liked ? (
            <FaHeart className="text-error text-[26px]" />
          ) : (
            <FaRegHeart className="text-text-light text-[26px]" />
          )}
          <span
            className={`text-12m lg:text-14m ${
              likesCount > 0 ? "text-error" : "text-text-light"
            }`}
          >
            {likesCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
