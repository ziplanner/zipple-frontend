import MainCategoryCard from "@/app/components/card/mainCategoryCard";
import { AGENT_CATEGORY, EXPERT_CATEGORY } from "@/app/data/mainCard";

const MainSection = () => {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-12 gap-6">
      {/* AGENT: 왼쪽 넓은 영역 */}
      <div className="flex flex-col gap-5 md:col-span-5">
        {AGENT_CATEGORY.map((item) => (
          <MainCategoryCard
            key={item.label}
            label={item.label}
            image={item.image}
            isExpert={false}
          />
        ))}
      </div>

      {/* EXPERT: 오른쪽 2열 그리드 */}
      <div className="grid grid-cols-2 gap-5 md:col-span-7">
        {EXPERT_CATEGORY.map((item) => (
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

export default MainSection;
