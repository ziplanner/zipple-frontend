import {
  specialtyCategories,
  livingExpertCategories,
} from "@/app/data/category";

interface CategorySelectorProps {
  selected: string;
  selectedValue: string;
  onSelect: (value: string, label: string) => void;
  type: "agent" | "service";
}

const CategorySelector = ({
  selected,
  selectedValue,
  onSelect,
  type,
}: CategorySelectorProps) => {
  const menu = type === "agent" ? specialtyCategories : livingExpertCategories;
  return (
    <>
      <button
        onClick={() => onSelect("", "전체")}
        className={`flex w-full py-3 rounded-[10px] pl-5 ${
          selectedValue === ""
            ? "bg-main text-white text-18s"
            : "text-text-secondary text-18r hover:bg-background-soft"
        }`}
      >
        전체
      </button>

      {menu.map((category) => (
        <div key={category.title} className="mb-4">
          <div className="text-text-primary text-16m mb-6 mt-11">
            {category.title}
          </div>
          <div className="flex flex-col gap-2">
            {category.items.map((item) => (
              <button
                key={item.value}
                onClick={() => onSelect(item.value, item.label)}
                className={`text-left py-3 rounded-[10px] text-18r pl-5 ${
                  selectedValue === item.value
                    ? "bg-main text-white text-18s"
                    : "text-text-secondary text-18r hover:bg-background-soft"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default CategorySelector;
