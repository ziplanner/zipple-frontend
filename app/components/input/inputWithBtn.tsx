import Image from "next/image";
import { ChangeEvent, KeyboardEvent } from "react";
import searchIcon from "@/app/images/icon/search.svg";
import uploadIcon from "@/app/images/icon/upload.svg";

type InputType = "search" | "file" | "text";

interface InputWithBtnProps {
  type: InputType;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchClick?: () => void;
  onFileSelect?: (file: File | null) => void;
  placeholder?: string;
  label?: string;
  onBtnClick?: () => void;
  accept?: string;
  direction?: "row" | "col" | "responsive";
  disabled?: boolean;
  inputId?: string;
}

export const InputWithBtn = ({
  type,
  searchValue,
  onSearchChange,
  onSearchClick,
  onFileSelect,
  placeholder,
  label,
  onBtnClick,
  accept,
  direction = "responsive",
  disabled = false,
  inputId,
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

  const getDirectionClass = () => {
    switch (direction) {
      case "row":
        return "flex-row";
      case "col":
        return "flex-col";
      default:
        return "md:flex-row flex-col";
    }
  };

  const getDirectionWidthClass = () => {
    switch (direction) {
      case "row":
        return "w-full";
      case "col":
        return "w-full";
      default:
        return "md:w-[154px] w-full";
    }
  };

  return (
    <div className={`flex items-center gap-2.5 w-full ${getDirectionClass()}`}>
      {/* 검색 인풋 */}
      <input
        type="text"
        placeholder={placeholder || ""}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`flex-grow w-full h-[60px] border rounded-[10px] px-2 md:px-4 text-18r
                focus:outline-none focus:border-main text-text-secondary`}
      />

      {/* 타입별 버튼 */}
      {type === "search" && (
        <button
          onClick={onSearchClick}
          className={`${getDirectionWidthClass()} h-[60px] border border-btn rounded-[10px] flex items-center
            justify-center gap-1 transition active:scale-95 text-btn text-18s flex-shrink-0`}
        >
          <Image src={searchIcon} alt="search" className="w-6 h-6" /> 검색
        </button>
      )}

      {type === "file" && (
        <>
          <label
            htmlFor={inputId || "file-upload"}
            className={`${getDirectionWidthClass()} h-[60px] border border-btn rounded-[10px] flex items-center justify-center gap-1
                    cursor-pointer transition active:scale-95 text-btn text-18s flex-shrink-0`}
          >
            <Image src={uploadIcon} alt="upload" className="w-6 h-6" /> 파일선택
          </label>
          <input
            id={inputId || "file-upload"}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
        </>
      )}

      {type === "text" && label && onBtnClick && (
        <button
          onClick={onBtnClick}
          className={`${getDirectionWidthClass()} h-[60px] border border-btn rounded-[10px] flex items-center
            justify-center gap-1 transition active:scale-95 text-btn text-18s flex-shrink-0`}
        >
          {label}
        </button>
      )}
    </div>
  );
};
