import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  // Helper to generate page numbers and ellipsis
  function getPageNumbers() {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Show first 3 pages, last page, and ellipsis in between as needed
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage > totalPages - 4) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
      }
    }
    return pages;
  }

  const pages = getPageNumbers();

  return (
    <nav
      className="inline-flex items-center space-x-2"
      aria-label="Pagination"
    >
      {/* Previous */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded-full border border-green-500 text-green-500 p-2 transition-colors ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500 hover:text-white"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers */}
      {pages.map((page, idx) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="px-3 text-green-500 select-none"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-colors font-medium
              ${
                isActive
                  ? "bg-green-500 text-white border-green-500"
                  : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              }
            `}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`rounded-full border border-green-500 text-green-500 p-2 transition-colors ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500 hover:text-white"
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
