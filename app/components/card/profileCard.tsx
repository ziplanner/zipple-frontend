import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ping from "@/app/images/icon/ping_yellow.svg";
import useResponsive from "@/app/hook/useResponsive";

interface AgentCardProps {
  name: string;
  agency: string;
  profileImage?: string;
  propertyType: string;
  portfolioCount: number;
  greeting: string;
  description: string;
  locations: string[];
  badges: string[];
  liked: boolean;
  likeCount: number;
  onClick: () => void;
}

const ProfileCard = ({
  name,
  agency,
  profileImage,
  propertyType,
  portfolioCount,
  greeting,
  description,
  locations,
  badges,
  liked,
  likeCount,
  onClick,
}: AgentCardProps) => {
  const isMd = useResponsive("md");

  return (
    <div
      className="relative border-b border-border py-5 lg:py-8 lg:px-4 bg-white cursor-pointer"
      onClick={onClick}
    >
      {/* Like Button - top right */}
      <div className="absolute top-4 right-5 flex flex-col items-center">
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
      <div className="flex flex-col md:flex-row md:gap-6 lg:gap-10">
        {/* Top Tag */}
        {!isMd && (
          <div className="text-14r lg:text-16m text-text-secondary mb-4">
            {propertyType} | 포트폴리오 {portfolioCount}개
          </div>
        )}
        {/* Profile Image */}
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
                {agency}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col w-full">
          {/* Top Tag */}
          {isMd && (
            <div className="text-14r lg:text-16m text-text-secondary mb-4">
              {propertyType} | 포트폴리오 {portfolioCount}개
            </div>
          )}
          {isMd && (
            <div className="flex flex-col md:flex-row gap-2.5 items-center">
              <div className="text-18s lg:text-24s text-text-primary">
                {name}
              </div>
              <div className="text-14r lg:text-16r text-text-secondary">
                {agency}
              </div>
            </div>
          )}
          {/* Greeting */}
          <div className="text-14m lg:text-16m text-text-secondary mt-4 lg:mt-3 mb-2.5 lg:mb-5">
            “ {greeting} ”
          </div>

          {/* Description */}
          <div
            className="text-12r lg:text-14r text-text-light p-2.5 line-clamp-2
      bg-background-soft rounded-[4px]"
          >
            {description}
          </div>
          <div
            className="flex flex-col gap-2 lg:gap-0 lg:flex-row items-start
          lg:items-center justify-between mt-3 lg:mt-4"
          >
            {/* Location */}
            <div className="flex items-center gap-0.5 text-14m lg:text-16m text-text-secondary">
              <Image src={ping} alt="ping" width={24} height={24} />
              {locations.join(", ")}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-end gap-2 self-end lg:self-baseline">
              {badges.map((badge, i) => (
                <span
                  key={i}
                  className="bg-yellow-100 text-yellow-700 text-12 m px-2 py-0.5 rounded-md"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
