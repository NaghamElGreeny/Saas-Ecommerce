import { ChevronLeft, ChevronRight } from "lucide-react";

interface Meta {
  current_page: number;
  last_page: number;
}

interface PaginationProps {
  meta: Meta;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ meta, onPageChange }) => {
  const { current_page, last_page } = meta;

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (last_page <= 3) {
      for (let i = 1; i <= last_page; i++) pages.push(i);
    } else {
      if (current_page > 2) pages.push(1);
      if (current_page > 3) pages.push("...");

      for (
        let i = Math.max(1, current_page - 1);
        i <= Math.min(last_page, current_page + 1);
        i++
      ) {
        pages.push(i);
      }

      if (current_page < last_page - 2) pages.push("...");
      if (current_page < last_page - 1) pages.push(last_page);
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 rounded-full text-sm flex items-center justify-center transition ${
            page === current_page
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
          }`}
        >
          {page}
        </button>
      ) : (
        <span key={index} className="px-2 text-gray-500">
          ...
        </span>
      )
    );
  };

  return (
    <div className="flex justify-center mt-6 gap-2 flex-wrap items-center">
      <button
        onClick={() => onPageChange(current_page - 1)}
        disabled={current_page === 1}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(current_page + 1)}
        disabled={current_page === last_page}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
