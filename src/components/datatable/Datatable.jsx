import { useEffect, useRef, useState, useMemo } from "react";
import DatatableIconButton from "./DatatableIconButton";
import { rowsPerPageOptions } from "../../constants/Constants";
import { getNestedValue } from "../../constants/Helpers";
import LoadingIcon from "../icons/Loadingicon";
import Paper from "../Paper";
import DatatableTitle from "./DatatableTitle";
import cloneDeep from "lodash/cloneDeep";
import DatatableHeader from "./DatatableHeader";
import DatatableBodyRow from "./DatatableBodyRow";
import Pagination from "./Pagination";
import "../../styles/datatableStyles.scss";

const Datatable = ({
  columns,
  records,
  config,
  title,
  isLoading,
  remoteDataControl,
  resetCurrentPaginationPage,
  actions,
}) => {
  const columnsRef = useRef(columns),
    actionsRef = useRef(actions),
    [sorting, setSorting] = useState({
      field: "",
      order: "",
    }),
    [totalItems, setTotalItems] = useState(0),
    [currentPage, setCurrentPage] = useState(1),
    [search, setSearch] = useState(""),
    [rowsPerPageNum, setRowsPerPageNum] = useState("10");

  const actionsCol = useMemo(() => {
    if (actionsRef.current) {
      return {
        field: "actionsCol",
        colName: "Actions",
        render: (rowData) => (
          <>
            {actionsRef.current.map((el, i) => (
              <DatatableIconButton
                key={i}
                disabled={el.disabled}
                hidden={el.hidden}
                icon={el.icon}
                onClick={el.onClick}
                rowData={rowData}
                tooltipContent={el.tooltipContent}
                tooltipPosition={el.tooltipPosition}
              />
            ))}
          </>
        ),
      };
    }
  }, []);

  useEffect(() => {
    if (columnsRef.current && actionsRef.current) {
      const clonedColumns = cloneDeep(columnsRef.current),
        foundActionsCol = clonedColumns.find((el) => el.field === "actionsCol"),
        finalColumns = foundActionsCol
          ? clonedColumns.filter((el) => el.field !== "actionsCol")
          : clonedColumns;

      if (config?.isActionsColumnLast) {
        finalColumns.push(actionsCol);
      } else {
        finalColumns.unshift(actionsCol);
      }
      columnsRef.current = finalColumns;
    }
  }, [actionsCol, config?.isActionsColumnLast]);

  useEffect(() => {
    if (remoteDataControl?.onPaginationDataUpdate) {
      remoteDataControl.onPaginationDataUpdate(currentPage, +rowsPerPageNum);
    }
    // eslint-disable-next-line
  }, [rowsPerPageNum, currentPage]);

  useEffect(() => {
    if (resetCurrentPaginationPage) {
      resetCurrentPaginationPage(() => {
        setCurrentPage(1);
      });
    }
    // eslint-disable-next-line
  }, []);

  const onChangeRowsPerPage = (value) => {
    setRowsPerPageNum(value);
  };

  const recordsData = useMemo(() => {
    let clonedRecords = cloneDeep(records);

    //sorting functionality
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      clonedRecords = clonedRecords.sort(
        (a, b) =>
          reversed *
          getNestedValue({ key: sorting.field, obj: a })
            ?.toString()
            .toLowerCase()
            .localeCompare(
              getNestedValue({ key: sorting.field, obj: b })
                ?.toString()
                .toLowerCase()
            )
      );
    }

    //search functionality
    if (search && config?.isSearch && !remoteDataControl?.onDebouncedSearch) {
      const filteredArray = columnsRef.current.map((col) =>
        clonedRecords.filter((record) =>
          getNestedValue({ key: col.field, obj: record })
            ?.toString()
            .toLowerCase()
            .includes(search.toString().toLowerCase())
        )
      );

      clonedRecords = filteredArray.reduce(function (flat, toFlatten) {
        return flat.concat(
          Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
        );
      }, []);
    }

    //pagination functionality
    if (config?.isPagination) {
      setTotalItems(
        remoteDataControl?.totalItems
          ? remoteDataControl?.totalItems
          : clonedRecords.length
      );

      if (!remoteDataControl) {
        clonedRecords = clonedRecords.slice(
          (currentPage - 1) * +rowsPerPageNum,
          (currentPage - 1) * +rowsPerPageNum + +rowsPerPageNum
        );
      }
    }

    return clonedRecords;
    // eslint-disable-next-line
  }, [
    records,
    sorting,
    currentPage,
    search,
    config?.isPagination,
    config?.isSearch,
    remoteDataControl?.totalItems,
    rowsPerPageNum,
  ]);

  return (
    <Paper className="outer-table-wrapper">
      {isLoading && (
        <div className="center-loader-wrapper">
          <LoadingIcon />
        </div>
      )}
      <DatatableTitle
        title={title}
        isSearch={config?.isSearch}
        searchConfig={{
          isSearchDisabled: isLoading,
          isDebounce: remoteDataControl?.onDebouncedSearch !== undefined,
          onSearch: (value) => {
            setSearch(value);
            setCurrentPage(1);
            remoteDataControl?.onDebouncedSearch &&
              remoteDataControl.onDebouncedSearch(value);
          },
        }}
      />
      <div className="table-wrapper">
        <table
          className={`table ${config?.tableClasses ? config.tableClasses : ""}`}
        >
          <DatatableHeader
            columns={columnsRef.current}
            onSorting={(field, order) => setSorting({ field, order })}
            actions={actions}
          />
          <tbody>
            {recordsData.map((row, i) => (
              <DatatableBodyRow
                key={i}
                row={row}
                columns={columnsRef.current}
                actions={actions}
              />
            ))}
          </tbody>
        </table>
        {recordsData.length === 0 && (
          <p className="no-data">No data to display</p>
        )}
      </div>
      {config?.isPagination && (
        <Pagination
          total={totalItems}
          itemsPerPage={+rowsPerPageNum}
          currentPage={currentPage}
          onPageChanged={(page) => setCurrentPage(page)}
          perPageDropdown={
            config?.paginationConfig?.isRowsDropdown
              ? {
                  rowsPerPageOptions,
                  rowsPerPageNum,
                  onChangeRowsPerPage,
                }
              : undefined
          }
          isLoading={isLoading}
        />
      )}
    </Paper>
  );
};
export default Datatable;
