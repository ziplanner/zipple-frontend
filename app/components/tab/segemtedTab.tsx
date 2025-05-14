import { useState } from "react";

interface SegmentedTabProps {
  tabs: string[];
  defaultTab: string;
  onChange?: (tab: string) => void;
  className?: string;
}

export const SegmentedTab = ({
  tabs,
  defaultTab,
  onChange,
  className,
}: SegmentedTabProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const handleClick = (tab: string) => {
    setActiveTab(tab);
    onChange?.(tab);
  };

  return (
    <div
      className={`${className} w-full flex bg-background-extraSoft rounded-full`}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => handleClick(tab)}
            className={`
              flex-1 w-[120px] md:w-[160px] py-3 text-nowrap text-14r md:text-16r
              rounded-full transition-all duration-300 ease-in-out
              ${
                isActive
                  ? "bg-main text-white shadow-md text-14s md:text-16s"
                  : "text-text-secondary"
              }
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};
