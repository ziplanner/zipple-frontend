import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ping from "@/app/images/icon/ping_yellow.svg";
import useResponsive from "@/app/hook/useResponsive";

interface AgentCardProps {
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

const ProfileCard = ({
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
}: AgentCardProps) => {
  const isMd = useResponsive("md");

  return (
    <div
      className="relative border-b border-border py-5 lg:py-8 lg:px-4 bg-white cursor-pointer"
      onClick={onClick}
    >
      {/* 좋아요 버튼 */}
      <div className="absolute top-4 right-5 flex flex-col items-center">
        {isLiked ? (
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
      </div>

      <div className="flex flex-col md:flex-row md:gap-6 lg:gap-10">
        {/* 상단 태그 */}
        {!isMd && (
          <div className="text-14r lg:text-16m text-text-secondary mb-4">
            {specializedType} | 포트폴리오 {portfolioCount}개
          </div>
        )}

        {/* 프로필 이미지 */}
        <div className="flex flex-row items-center gap-5">
          <div className="w-[100px] h-[100px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] rounded-full bg-gray-100 overflow-hidden shrink-0">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={name}
                width={100}
                height={100}
                className="object-cover rounded-full md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px]"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
          {!isMd && (
            <div className="flex flex-col md:flex-row gap-2.5 md:items-center">
              <div className="text-18s lg:text-24s text-text-primary">
                {name}
              </div>
              <div className="text-14r lg:text-16r text-text-secondary">
                {businessName}
              </div>
            </div>
          )}
        </div>

        {/* 우측 정보 */}
        <div className="flex flex-col w-full">
          {isMd && (
            <div className="text-14r lg:text-16m text-text-secondary mb-4">
              {specializedType} | 포트폴리오 {portfolioCount}개
            </div>
          )}
          {isMd && (
            <div className="flex flex-col md:flex-row gap-2.5 items-center">
              <div className="text-18s lg:text-24s text-text-primary">
                {name}
              </div>
              <div className="text-14r lg:text-16r text-text-secondary">
                {businessName}
              </div>
            </div>
          )}

          {/* 인사말 */}
          <div className="text-14m lg:text-16m text-text-secondary mt-4 lg:mt-3 mb-2.5 lg:mb-5">
            “ {introduceTitle || "중개사 인사말을 준비 중입니다."} ”
          </div>

          {/* 상세 소개 */}
          <div className="text-12r lg:text-14r text-text-light p-2.5 line-clamp-2 bg-background-soft rounded-[4px]">
            {introduceContent || "상세 소개가 등록되지 않았습니다."}
          </div>

          {/* 지역 + 배지 */}
          <div
            className="flex flex-col gap-2 lg:gap-0 lg:flex-row items-start
            lg:items-center justify-between mt-3 lg:mt-4"
          >
            {/* 활동 지역 */}
            <div className="flex items-center gap-0.5 text-14m lg:text-16m text-text-secondary">
              <Image src={ping} alt="ping" width={24} height={24} />
              {representativeArea.length > 0
                ? representativeArea.join(", ")
                : "지역 정보 없음"}
            </div>

            {/* 배지 */}
            <div className="flex flex-wrap justify-end gap-2 self-end lg:self-baseline">
              <span className="bg-yellow-100 text-yellow-700 text-12m px-2 py-0.5 rounded-md">
                대표
              </span>
              {/* 추가 배지 있으면 여기에 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
