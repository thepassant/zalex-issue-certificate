import { useEffect, useState } from "react";
import DoubleChevronLeftIcon from "../icons/DoubleChevronLeftIcon";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import DoubleChevronRightIcon from "../icons/DoubleChevronRightIcon";
import Dropdown from "../dropdown/DropdownComponent";

const Pagination = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChanged,
  perPageDropdown,
}) => {
  const [totalPages, setTotalPages] = useState(0),
    isPrevBtnDisabled = currentPage === 1 || currentPage > totalPages,
    isNextBtnDisabled = currentPage >= totalPages || total === 0;

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0) {
      setTotalPages(Math.ceil(total / itemsPerPage));
    }
  }, [total, itemsPerPage]);

  return (
    <div className="pagination-outer-wrapper">
      <div className="pagination-wrapper">
        <button
          className="pagination-btn"
          onClick={() => onPageChanged(1)}
          disabled={isPrevBtnDisabled}
        >
          <DoubleChevronLeftIcon />
        </button>
        <button
          className="pagination-btn"
          onClick={() => onPageChanged(currentPage - 1)}
          disabled={isPrevBtnDisabled}
        >
          <ChevronLeftIcon />
        </button>
        <span className="pagination-caption">
          {total > 0
            ? `${
                1 + itemsPerPage * (currentPage - 1) > total
                  ? total
                  : 1 + itemsPerPage * (currentPage - 1)
              } - ${
                currentPage * itemsPerPage > total
                  ? total
                  : currentPage * itemsPerPage
              }`
            : 0}{" "}
          of {total}
        </span>
        <button
          className="pagination-btn"
          onClick={() => onPageChanged(currentPage + 1)}
          disabled={isNextBtnDisabled}
        >
          <ChevronRightIcon />
        </button>
        <button
          className="pagination-btn"
          onClick={() => onPageChanged(totalPages)}
          disabled={isNextBtnDisabled}
        >
          <DoubleChevronRightIcon />
        </button>
      </div>
      {perPageDropdown && (
        <Dropdown
          wrapper={{
            controlledDropdown: {
              value: perPageDropdown.rowsPerPageNum,
              onChangeHandler: perPageDropdown.onChangeRowsPerPage,
            },
          }}
          body={{
            options: perPageDropdown.rowsPerPageOptions,
          }}
        />
      )}
    </div>
  );
};

export default Pagination;
