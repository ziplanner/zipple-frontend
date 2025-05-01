import Image from "next/image";
import menu from "@/app/images/icon/dotMenu.svg";

interface PortfolioCardProps {
  title: string;
  date: string;
  thumbnail?: string;
}

export const PortfolioCard = ({
  title,
  date,
  thumbnail,
}: PortfolioCardProps) => {
  return (
    <div className="relative bg-white">
      {/* 썸네일 영역 */}
      <div className="relative w-full aspect-[1/1] border border-border rounded-xl bg-gradient-to-b to-gray-100 from-gray-200">
        {/* 썸네일 이미지가 있을 경우 */}
        {thumbnail && (
          <img
            src={thumbnail}
            alt="portfolio"
            className="object-cover w-full h-full rounded-xl"
          />
        )}
        {/* 우측 상단 메뉴 */}
        <div className="absolute top-2 right-2">
          <Menu />
        </div>
      </div>

      {/* 텍스트 정보 */}
      <p className="mt-3 md:mt-4 text-text-primary text-16m md:text-18m line-clamp-1">
        {title}
      </p>
      <p className="text-text-secondary text-14r md:text-16r mt-[6px] md:mt-2.5">
        {date}
      </p>
    </div>
  );
};

const Menu = () => {
  return (
    <div className="relative group">
      <button>
        <Image src={menu} alt="menu" width={36} height={36} />
      </button>
      <div
        className="absolute right-0 hidden group-hover:flex
          flex-col bg-white border border-line-light shadow-md rounded-[6px]
          text-14r md:text-16r text-text-secondary z-10 min-w-[100px]"
      >
        <button className="hover:bg-background-soft hover:rounded-t-[6px] px-5 py-2.5 text-center whitespace-nowrap">
          수정하기
        </button>
        <button className="hover:bg-background-soft hover:rounded-b-[6px] px-5 py-2.5 text-center whitespace-nowrap">
          삭제하기
        </button>
      </div>
    </div>
  );
};
