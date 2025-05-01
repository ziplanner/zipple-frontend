import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div
      className={`${className} flex items-center justify-center gap-2 py-4 text-sm`}
    >
      {/* First */}
      <button
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        className="text-text-primary disabled:text-text-light"
      >
        <ChevronsLeft size={18} />
      </button>

      {/* Prev */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-text-primary disabled:text-text-light"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page numbers */}
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => goToPage(num)}
          className={`w-8 h-8 rounded-md flex items-center justify-center
            ${
              num === currentPage
                ? "bg-blue-500 text-white"
                : "text-text-secondary hover:bg-gray-100"
            }`}
        >
          {num}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} />
      </button>

      {/* Last */}
      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        className="text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        <ChevronsRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
