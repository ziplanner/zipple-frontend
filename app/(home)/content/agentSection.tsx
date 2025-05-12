import MainCategoryCard from "@/app/components/card/mainCategoryCard";
import { AGENT_CATEGORY_MAIN, AGENT_CATEGORY_SUB } from "@/app/data/mainCard";

const AgentSection = () => {
  return (
    <div className="flex flex-col w-full gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {AGENT_CATEGORY_MAIN.map((item) => (
          <MainCategoryCard
            key={item.label}
            label={item.label}
            image={item.image}
            isExpert={false}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {AGENT_CATEGORY_SUB.map((item) => (
          <MainCategoryCard
            key={item.label}
            label={item.label}
            image={item.image}
            isExpert={false}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentSection;
