import { useState } from "react";
import Image from "next/image";
import defaultProfile from "@/app/images/icon/default_profile.svg";
import phone from "@/app/images/icon/phone.svg";
import RoleToken from "@/app/components/token/roleToken";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useBrokerDetail } from "@/app/context/agentDetailContext";
import { formatPhoneNumber } from "@/app/utils/phoneNumber";
import { unlikeReceiver, likeReceiver } from "@/app/api/matching/api";
import { useSearchParams } from "next/navigation";

const MobileProfileSection = () => {
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
    <div className="w-full p-[30px] pb-5 border border-border rounded-[20px] mt-5">
      <div className="flex flex-col w-full items-center">
        <div className="flex gap-4 items-center justify-center">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={data?.profileUrl || defaultProfile}
              alt="User"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>

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
        <button
          disabled={isLoading}
          className="flex flex-col items-center justify-center mt-5"
          onClick={handleLikeClick}
        >
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
            {likesCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileProfileSection;
