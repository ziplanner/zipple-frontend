import Image from "next/image";
import close from "@/app/images/icon/close.svg";
import {
  specialtyCategories,
  livingExpertCategories,
} from "@/app/data/category";

interface CategoryModalProps {
  onClose: () => void;
  selected: string;
  onSelect: (value: string, label: string) => void;
  type: "agent" | "service";
}

const CategoryModal = ({
  onClose,
  selected,
  onSelect,
  type,
}: CategoryModalProps) => {
  const menu = type === "agent" ? specialtyCategories : livingExpertCategories;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div
        className="relative bg-white rounded-[20px] p-[30px] w-full mx-5
        flex flex-col items-center shadow-lg h-[80vh]"
      >
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4 p-1">
          <Image src={close} alt="close" width={20} height={20} />
        </button>

        {/* 콘텐츠 영역 */}
        <div className="flex flex-col w-full h-full">
          {/* 고정 헤더 */}
          <h1 className="text-text-primary text-18s md:text-20s mb-5">
            전문분야
          </h1>

          {/* 스크롤 가능 영역 */}
          <div className="flex-1 overflow-y-auto min-h-0 pr-1 pb-10 custom-scrollbar">
            <button
              onClick={() => onSelect("", "전체")}
              className={`flex w-full py-3 rounded-[10px] pl-5 mb-6 ${
                selected === ""
                  ? "bg-main text-white text-16s"
                  : "text-text-secondary text-16r hover:bg-background-soft"
              }`}
            >
              전체
            </button>

            {menu.map((category) => (
              <div key={category.title} className="mb-4">
                <div className="text-text-primary text-14m mb-6 mt-11">
                  {category.title}
                </div>
                <div className="flex flex-col gap-2">
                  {category.items.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => onSelect(item.value, item.label)}
                      className={`text-left py-4 rounded-[10px] text-16r pl-5 ${
                        selected === item.value
                          ? "bg-main text-white text-16s"
                          : "text-text-secondary text-16r hover:bg-background-soft"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
