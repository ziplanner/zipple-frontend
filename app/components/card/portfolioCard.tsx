import { useState } from "react";
import { Menu } from "../menu/menu";
import Alert from "../alert/alert";

interface PortfolioCardProps {
  portfolioId: number;
  title: string;
  date: string;
  thumbnail?: string;
  portfolioUrl: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  btnHidden?: boolean;
}

export const PortfolioCard = ({
  portfolioId,
  title,
  date,
  portfolioUrl,
  thumbnail,
  onEdit,
  onDelete,
  btnHidden = false,
}: PortfolioCardProps) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleDelete = async () => {
    await onDelete(portfolioId);
    setShowAlert(false);
  };

  const getSafeUrl = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div className="relative bg-white">
      {/* 썸네일 영역 */}
      <div
        className="relative  w-full aspect-[1/1] border border-border rounded-xl bg-gradient-to-b to-gray-50 from-gray-200 overflow-hidden cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          window.open(
            getSafeUrl(portfolioUrl),
            "_blank",
            "noopener,noreferrer"
          );
        }}
      >
        {thumbnail && (
          <img
            src={thumbnail}
            alt="portfolio"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {!btnHidden && (
          <div
            className="absolute top-2 right-2 z-10"
            onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
          >
            <Menu
              onEdit={() => onEdit(portfolioId)}
              onDelete={() => setShowAlert(true)}
            />
          </div>
        )}
      </div>

      {/* 텍스트 정보 */}
      <p className="mt-3 md:mt-4 text-text-primary text-16m md:text-18m line-clamp-1">
        {title}
      </p>
      <p className="text-text-secondary text-14r md:text-16r mt-[6px] md:mt-2.5">
        {date}
      </p>

      {/* 삭제 알림 모달 */}
      {showAlert && (
        <Alert
          text="삭제하시겠습니까?"
          leftBtnText="취소"
          rightBtnText="삭제"
          onClose={() => setShowAlert(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};
