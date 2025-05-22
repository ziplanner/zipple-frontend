import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ping from "@/app/images/icon/ping_yellow.svg";
import useResponsive from "@/app/hook/useResponsive";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { likeReceiver, unlikeReceiver } from "@/app/api/matching/api";

interface ScrapProfileCardProps {
  brokerId: number;
  name: string;
  businessName: string;
  profileImage?: string;
  specializedType: string;
  portfolioCount: number;
  likesCount: number;
  isLiked: boolean;
  introduceTitle?: string;
  introduceContent?: string;
  representativeArea: string[];
  // 생활전문가
  // agency?: string;
  // propertyType?: string;
  // greeting?: string;
  // description?: string;
  // locations?: string[];
  // badges?: string;
  onClick: () => void;
}

const ScrapProfileCard = ({
  brokerId,
  name,
  businessName,
  profileImage,
  specializedType,
  portfolioCount,
  likesCount,
  isLiked,
  introduceTitle,
  introduceContent,
  representativeArea,
  onClick,
}: ScrapProfileCardProps) => {
  const isMd = useResponsive("md");
  const router = useRouter();

  const [isLikedState, setIsLikedState] = useState<boolean>(isLiked);
  const [likesCountState, setLikesCountState] = useState<number>(likesCount);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLikeClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (isLikedState) {
        await unlikeReceiver(brokerId);
        setIsLikedState(false);
        setLikesCountState((prev) => Math.max(prev - 1, 0));
      } else {
        await likeReceiver(brokerId);
        setIsLikedState(true);
        setLikesCountState((prev) => prev + 1);
      }
    } catch (err) {
      console.error("좋아요 처리 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col md:gap-5 w-[280px] md:w-[410px] cursor-pointer
        border border-background-light hover:border-main hover:shadow-md
        rounded-[20px] pt-[30px] pb-5
        transition-transform duration-500 ease-in-out hover:-translate-y-4"
      onClick={() => {
        router.push("/");
      }}
    >
      <div className="flex flex-col gap-4 w-full items-center">
        {/* 상단 태그 */}
        <div className="text-14r lg:text-16m text-text-secondary mb-2.5 md:mb-3">
          {specializedType} | 포트폴리오 {portfolioCount}개
        </div>
        {/* 프로필 이미지 */}
        <div className="flex flex-row items-center">
          <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] rounded-full bg-gray-100 overflow-hidden shrink-0">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={name}
                width={120}
                height={120}
                className="object-cover rounded-full md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px]"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <div className="text-18s lg:text-24s text-text-primary">{name}</div>
          <div className="text-14r lg:text-16r text-text-secondary">
            {businessName}
          </div>
        </div>
        {/* 인사말 */}
        <div className="text-14m md:text-18m text-text-secondary">
          “ {introduceTitle || "중개사 인사말을 준비 중입니다."} ”
        </div>
        {/* 활동 지역 */}
        <div className="flex">
          <Image src={ping} alt="ping" width={24} height={24} />
          {representativeArea.length > 0
            ? representativeArea.join(", ")
            : "지역 정보 없음"}
        </div>
        {/* 배지 */}
        <span
          className="bg-sub_bg text-sub_text text-14m
      px-2.5 py-1 rounded-md "
        >
          대표
        </span>
        {/* 좋아요 버튼 */}
        <div className="md:mt-3 mt-2.5" onClick={handleLikeClick}>
          {isLikedState ? (
            <FaHeart className="text-error text-[26px]" />
          ) : (
            <FaRegHeart className="text-text-light text-[26px]" />
          )}
          <div className="text-center text-12r mt-1 text-text-secondary">
            {likesCountState}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapProfileCard;
