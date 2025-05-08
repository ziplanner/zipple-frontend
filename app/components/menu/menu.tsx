import Image from "next/image";
import menu from "@/app/images/icon/dotMenu.svg";

interface MenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const Menu = ({ onEdit, onDelete }: MenuProps) => {
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
        <button
          className="hover:bg-background-soft hover:rounded-t-[6px] px-5 py-2.5 text-center whitespace-nowrap"
          onClick={onEdit}
        >
          수정하기
        </button>
        <button
          className="hover:bg-background-soft hover:rounded-b-[6px] px-5 py-2.5 text-center whitespace-nowrap"
          onClick={onDelete}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};
