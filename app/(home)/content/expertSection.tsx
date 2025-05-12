import MainCategoryCard from "@/app/components/card/mainCategoryCard";
import { EXPERT_CATEGORY_MAIN, EXPERT_CATEGORY_SUB } from "@/app/data/mainCard";

const ExpertSection = () => {
  return (
    <div className="flex flex-col w-full gap-5">
      {/* AGENT: 왼쪽 넓은 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {EXPERT_CATEGORY_MAIN.map((item) => (
          <MainCategoryCard
            key={item.label}
            label={item.label}
            image={item.image}
            isExpert={true}
          />
        ))}
      </div>

      {/* EXPERT: 오른쪽 2열 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {EXPERT_CATEGORY_SUB.map((item) => (
          <MainCategoryCard
            key={item.label}
            label={item.label}
            image={item.image}
            isExpert={true}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpertSection;
