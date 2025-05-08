import { BasicBtn } from "@/app/components/button/basicBtn";
import { PortfolioCard } from "@/app/components/card/portfolioCard";
import Pagination from "@/app/components/pagination/pagination";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DUMMY_DATA = Array(33)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    title: `(포트폴리오 ${
      i + 1
    }) 100평대 사무실 임대 최대 한줄까지만 들어가겠습니다! `,
    date: "2025.05.05",
  }));

const ITEMS_PER_PAGE = 12;

const PortfolioSection = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentItems = DUMMY_DATA.slice(startIdx, endIdx);

  const totalPages = Math.ceil(DUMMY_DATA.length / ITEMS_PER_PAGE);

  return (
    <div className="flex w-full flex-col md:px-8 md:py-10 lg:px-[60px] lg:py-20">
      <div className="flex justify-between w-full mb-10">
        <h2 className="text-text-primary text-18s md:text-24s">포토폴리오</h2>
        <BasicBtn
          onClick={() => {
            router.push("/profile");
          }}
          text={"전체보기"}
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mb-[60px] md:mb-20">
        {currentItems.map((item) => (
          <PortfolioCard
            key={item.id}
            title={item.title}
            date={item.date}
            portfolioId={0}
            onEdit={function (id: number): void {
              throw new Error("Function not implemented.");
            }}
            onDelete={function (id: number): void {
              throw new Error("Function not implemented.");
            }}
          />
        ))}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mb-24 md:mb-[120px]"
      />
    </div>
  );
};

export default PortfolioSection;
