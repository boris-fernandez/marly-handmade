import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const baseBtn = "px-3 py-2 border rounded font-semibold transition-all";
  const activeBtn = "bg-[#1B2A40] text-[#F5E3C3] border-[#1B2A40]";
  const inactiveBtn = "bg-white text-[#1B2A40] border-gray-300 hover:bg-gray-100";
  const disabledBtn = "cursor-not-allowed bg-gray-100 text-gray-400 border border-gray-300";

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        className={`${baseBtn} ${currentPage === 1 ? disabledBtn : inactiveBtn}`}
      >
        «
      </button>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseBtn} ${currentPage === 1 ? disabledBtn : inactiveBtn}`}
      >
        ‹
      </button>

      {[...Array(totalPages)].map((_, idx) => {
        const page = idx + 1;
        const isActive = currentPage === page;
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`${baseBtn} ${isActive ? activeBtn : inactiveBtn}`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseBtn} ${currentPage === totalPages ? disabledBtn : inactiveBtn}`}
      >
        ›
      </button>
      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        className={`${baseBtn} ${currentPage === totalPages ? disabledBtn : inactiveBtn}`}
      >
        »
      </button>
    </div>
  );
}

export default Pagination;
