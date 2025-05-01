import Image from "next/image";
import close from "@/app/images/icon/close.svg";
import plus from "@/app/images/icon/plus.svg";
import Input from "../input/input";
import { useState } from "react";
import { LargeBtn } from "../button/largeBtn";

interface PortfolioModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const PortfolioModal = ({ onClose, onSubmit }: PortfolioModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // 미리보기용 URL 생성
    }
  };
  const handleSubmit = () => {
    onSubmit();
  };

  const isValid = title.trim() && url.trim() && imageFile;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div
        className="relative bg-white rounded-[20px] p-5 max-w-[480px] mx-5
    flex flex-col items-center shadow-lg h-4/5"
      >
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4 p-1">
          <Image src={close} alt="close" width={20} height={20} />
        </button>

        {/* 상단 헤더 */}
        <h1 className="text-text-primary text-18s md:text-20s mb-5">
          포트폴리오 등록
        </h1>

        {/* 스크롤 가능한 콘텐츠 영역 */}
        <div className="w-full flex-1 min-h-0 overflow-y-auto py-2 md:px-5 custom-scrollbar">
          <div className="flex flex-col gap-10">
            {/* 제목 */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m md:text-16m">
                제목 <span className="text-error">*</span>
              </h3>
              <Input value={title} onChange={handleTitleChange} />
            </div>

            {/* URL */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m md:text-16m">
                URL <span className="text-error">*</span>
              </h3>
              <Input value={url} onChange={handleUrlChange} />
            </div>

            {/* 사진 등록 */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m md:text-16m">
                사진 <span className="text-error">*</span>
              </h3>

              <label htmlFor="file" className="cursor-pointer">
                <div
                  className="relative group flex justify-center items-center aspect-square w-full max-w-[400px]
      rounded-xl border border-border border-dotted bg-background-soft overflow-hidden"
                >
                  {previewUrl ? (
                    <>
                      <img
                        src={previewUrl}
                        alt="preview"
                        className="object-cover w-full h-full"
                      />
                      {/* Hover 시 오버레이 + +아이콘 표시 */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center">
                        <Image src={plus} alt="재등록" width={64} height={64} />
                        <p className="text-white text-14r mt-1">사진 수정</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-2">
                      <Image src={plus} alt="등록" width={64} height={64} />
                      <p className="text-text-secondary text-16r md:text-18r">
                        사진 등록
                      </p>
                    </div>
                  )}
                </div>
              </label>

              <input
                id="file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* 안내 문구 */}
            <div
              className="w-full flex flex-col gap-1 p-4 md:p-5 text-text-secondary
        rounded-[10px] bg-background-soft border"
            >
              <p className="text-12s md:text-14s">※ 권장규격: 640*640</p>
              <p className="text-12r md:text-14r">
                ※ 큰 이미지의 경우 업로드 시간이 다소 지연될 수 있고, 이미지가
                깨지는 경우가 발생할 수 있습니다.
              </p>
              <p className="text-12r md:text-14r">
                ※ 해당 중개물과 관련된 평면도 혹은 실 사진만 첨부 바랍니다.
              </p>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="w-full mt-4">
          <LargeBtn
            onClick={handleSubmit}
            text="등록하기"
            color="blue"
            disabled={!isValid}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
