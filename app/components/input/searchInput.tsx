import Image from "next/image";
import search from "@/app/images/icon/search.svg";

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
}

const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = "전문가 이름, 업체명, 전문분야",
  className = "",
}: SearchInputProps) => {
  return (
    <div
      className={`flex items-center w-full max-w-[320px] px-4 py-2.5 rounded-md
        bg-background-soft focus-within:ring-1 focus-within:ring-background-light ${className}`}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-text-secondary placeholder-text-light outline-none"
      />
      <Image
        src={search}
        alt="검색"
        width={18}
        height={18}
        className="ml-2 cursor-pointer"
        onClick={onSearch}
      />
    </div>
  );
};

export default SearchInput;
