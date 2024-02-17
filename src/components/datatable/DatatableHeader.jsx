import { useState } from "react";
import { getTableDataCellWidth } from "../../constants/Helpers";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import ChevronUpIcon from "../icons/ChevronUpIcon";

const DatatableHeader = ({ columns, onSorting, actions }) => {
  const [sortingField, setSortingField] = useState(""),
    [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting && onSorting(field, order);
  };

  return (
    <thead className="table-header">
      <tr className="table-head-row">
        {columns.map(({ field, colName, sortable, width }) => (
          <th
            style={{
              width: getTableDataCellWidth(width, field, columns, actions),
            }}
            key={field}
          >
            <span
              style={{ cursor: sortable ? "pointer" : "initial" }}
              onClick={() => (sortable ? onSortingChange(field) : null)}
              className={`table-head-label ${
                sortable ? "sortable-header" : ""
              }`}
            >
              {colName}
              {sortable && sortingField !== field && (
                <ChevronUpIcon className="sortable-icon" />
              )}
              {sortingField && sortingField === field && (
                <>
                  {sortingOrder === "asc" ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  )}
                </>
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default DatatableHeader;
