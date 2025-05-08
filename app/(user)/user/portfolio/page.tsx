"use client";

import { useEffect, useState } from "react";
import { PortfolioCard } from "@/app/components/card/portfolioCard";
import Pagination from "@/app/components/pagination/pagination";
import PortfolioBtn from "@/app/components/button/portfolioBtn";
import PortfolioModal from "@/app/components/modal/portfolioModal";
import AlertMessage from "@/app/components/alert/alertMessage";
import { getPortfolios, deletePortfolio } from "@/app/api/portfolio/api";

interface PortfolioData {
  portfolioId: number;
  portfolioTitle: string;
  portfolioLink: string;
  mainImageUrl: string;
  createdAt: string;
}

const ITEMS_PER_PAGE = 12;

const UserPortfolioPage = () => {
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [editTarget, setEditTarget] = useState<PortfolioData | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchData = async () => {
    try {
      const data = await getPortfolios(currentPage, ITEMS_PER_PAGE);
      setPortfolios(data.portfolios);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("포트폴리오 조회 실패:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    try {
      await deletePortfolio(id);
      setPortfolios((prev) => prev.filter((p) => p.portfolioId !== id));
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  const handleEdit = (id: number) => {
    const target = portfolios.find((p) => p.portfolioId === id) || null;
    setEditTarget(target);
    setOpen(true);
  };

  return (
    <div className="flex w-full flex-col md:px-8 md:py-10 lg:p-[60px]">
      <h1 className="text-text-primary text-22s md:text-30s">
        포토폴리오 관리
      </h1>
      <div className="border-b border-text-primary w-full mt-5 mb-[30px] md:mt-[30px] md:mb-10" />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mb-[60px] md:mb-20">
        {portfolios.map((item) => (
          <PortfolioCard
            key={item.portfolioId}
            portfolioId={item.portfolioId}
            title={item.portfolioTitle}
            date={item.createdAt.slice(0, 10)}
            thumbnail={item.mainImageUrl}
            onEdit={handleEdit}
            onDelete={handleDelete}
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

      <PortfolioBtn
        onClick={() => {
          setEditTarget(null);
          setOpen(true);
        }}
      />

      {open && (
        <PortfolioModal
          onClose={() => {
            setOpen(false);
            setEditTarget(null);
          }}
          onSubmit={() => {
            setOpen(false);
            setEditTarget(null);
            setAlertText(
              editTarget
                ? "포토폴리오가 수정되었습니다!"
                : "포토폴리오가 등록되었습니다!"
            );
            setShowAlert(true);
            setTimeout(() => {
              fetchData();
            }, 1000);
          }}
          editData={editTarget}
        />
      )}

      {showAlert && (
        <AlertMessage
          text={alertText}
          onClose={() => {
            setShowAlert(false);
          }}
        />
      )}
    </div>
  );
};

export default UserPortfolioPage;
