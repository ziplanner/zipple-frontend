import Image from "next/image";
import { ChangeEvent, KeyboardEvent } from "react";
import searchIcon from "@/app/images/icon/search.svg";
import uploadIcon from "@/app/images/icon/upload.svg";

type InputType = "search" | "file";

interface InputWithBtnProps {
  type: InputType;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchClick?: () => void;
  onFileSelect?: (file: File | null) => void;
}

export const InputWithBtn = ({
  type,
  searchValue,
  onSearchChange,
  onSearchClick,
  onFileSelect,
}: InputWithBtnProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect?.(file);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearchClick) {
      onSearchClick();
    }
  };

  return (
    <div className="flex items-center gap-2.5 w-full">
      {/* 검색 인풋 */}
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow w-full h-[60px] border rounded-[10px] px-4
                focus:outline-none focus:border-main"
      />

      {/* 타입별 버튼 */}
      {type === "search" && (
        <button
          onClick={onSearchClick}
          className="w-[154px] h-[60px] border border-btn rounded-[10px] flex items-center
            justify-center gap-1 transition text-btn text-18s flex-shrink-0"
        >
          <Image src={searchIcon} alt="search" className="w-6 h-6" /> 검색
        </button>
      )}

      {type === "file" && (
        <>
          <label
            htmlFor="file-upload"
            className="w-[154px] h-[60px] border border-btn rounded-[10px] flex items-center justify-center gap-1
                    cursor-pointer text-btn text-18s flex-shrink-0"
          >
            <Image src={uploadIcon} alt="upload" className="w-6 h-6" /> 파일선택
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
};
