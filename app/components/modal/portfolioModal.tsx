import { useEffect, useState } from "react";
import Image from "next/image";
import close from "@/app/images/icon/close.svg";
import plus from "@/app/images/icon/plus.svg";
import Input from "../input/input";
import { LargeBtn } from "../button/largeBtn";
import { createPortfolio, updatePortfolio } from "@/app/api/portfolio/api";
import ErrorAlertMessage from "../alert/errorAlertMessage";

interface PortfolioModalProps {
  onClose: () => void;
  onSubmit: () => void;
  editData?: {
    portfolioId: number;
    portfolioTitle: string;
    portfolioLink: string;
    mainImageUrl: string;
  } | null;
}

const PortfolioModal = ({
  onClose,
  onSubmit,
  editData,
}: PortfolioModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    if (editData) {
      setTitle(editData.portfolioTitle);
      setUrl(editData.portfolioLink);
      setPreviewUrl(editData.mainImageUrl);
    }
  }, [editData]);

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
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      if (editData) {
        await updatePortfolio(
          editData.portfolioId,
          imageFile ? [imageFile] : [],
          title,
          url
        );
      } else {
        if (!imageFile) return;
        await createPortfolio([imageFile], title, url);
      }
      onSubmit();
    } catch (err) {
      setShowAlert(true);
      console.error("포트폴리오 저장 실패:", err);
    }
  };

  const isValid = title.trim() && url.trim() && (imageFile || editData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="relative bg-white rounded-[20px] p-5 max-w-[480px] mx-5 flex flex-col items-center shadow-lg h-4/5">
        <button onClick={onClose} className="absolute top-4 right-4 p-1">
          <Image src={close} alt="close" width={20} height={20} />
        </button>

        <h1 className="text-text-primary text-18s md:text-20s mb-5">
          {editData ? "포트폴리오 수정" : "포트폴리오 등록"}
        </h1>

        <div className="w-full flex-1 min-h-0 overflow-y-auto py-2 md:px-5 custom-scrollbar">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m md:text-16m">
                제목 <span className="text-error">*</span>
              </h3>
              <Input value={title} onChange={handleTitleChange} />
            </div>

            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m md:text-16m">
                URL <span className="text-error">*</span>
              </h3>
              <Input value={url} onChange={handleUrlChange} />
            </div>

            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m md:text-16m">
                사진 {editData ? null : <span className="text-error">*</span>}
              </h3>

              <label htmlFor="file" className="cursor-pointer">
                <div className="relative group flex justify-center items-center aspect-square w-full max-w-[400px] rounded-xl border border-border border-dotted bg-background-soft overflow-hidden">
                  {previewUrl ? (
                    <>
                      <img
                        src={previewUrl}
                        alt="preview"
                        className="object-cover w-full h-full"
                      />
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

            <div className="w-full flex flex-col gap-1 p-4 md:p-5 text-text-secondary rounded-[10px] bg-background-soft border">
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

        <div className="w-full mt-4">
          <LargeBtn
            onClick={handleSubmit}
            text={editData ? "수정하기" : "등록하기"}
            color="blue"
            disabled={!isValid}
          />
        </div>

        {showAlert && (
          <ErrorAlertMessage
            text="포토폴리오 등록에 실패했습니다."
            onClose={() => setShowAlert(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PortfolioModal;
