import { useEffect, useCallback, useMemo } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
// import { fetchRequests } from "../redux/actions/requestActions";
import Datatable from "./datatable/Datatable";
import TrashIcon from "./icons/TrashIcon";
import { fetchRequestsList } from "../redux/requests/asyncActions/RequestAsyncActions";
import {
  getRequestsIsLoading,
  getRequestsList,
} from "../redux/requests/selectors/RequestSelectors";

const getRequestsDataTableConfig = (requestsDetails) => {
  const requestsRecords = requestsDetails,
    requestsColumns = [
      {
        colName: "Reference No.",
        field: "reference_no",
      },
      {
        colName: "Address to",
        field: "address_to",
      },
      {
        colName: "Purpose",
        field: "purpose",
      },
      {
        colName: "Issued on",
        field: "issued_on",
        sortable: true,
      },
      {
        colName: "Status",
        field: "status",
        sortable: true,
        // render: (rowData) => (
        //   <p
        //     className={`status ${
        //       rowData.subscription.status.toLowerCase() === "done"
        //         ? "success"
        //         : rowData.subscription.status.toLowerCase() === "pending"
        //         ? "danger"
        //         : "warn"
        //     }`}
        //   >
        //     {rowData.subscription.status}
        //   </p>
        // ),
      },
    ],
    requestsConfig = {
      tableClasses: "is-fullwidth",
      isPagination: true,
      isSearch: true,
      paginationConfig: {
        isRowsDropdown: true,
      },
    };
  // requestsActions = [
  //   {
  //     icon: <TrashIcon />,
  //     //it can be boolean => disabled: true
  //     disabled: (rowData) =>
  //       rowData.subscription.status.toLowerCase() === "active",
  //     //it can be boolean => hidden: true
  //     hidden: (rowData) =>
  //       rowData.subscription.status.toLowerCase() === "idle",
  //     tooltipContent: "Delete row",
  //     //use it to change the tooltip position (available: top, right, bottom, left) (default: bottom)
  //     // tooltipPosition: 'bottom',
  //     onClick: (e, rowData) => {
  //       console.log("delete ", `${rowData.first_name} ${rowData.last_name}`);
  //     },
  //   },
  // ];

  return { requestsColumns, requestsRecords, requestsConfig };
};

function RequestsList({ error }) {
  const requestsList = useSelector(getRequestsList),
    isLoading = useSelector(getRequestsIsLoading),
    { requestsColumns, requestsRecords, requestsConfig } =
      getRequestsDataTableConfig(requestsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRequestsList());
  }, [dispatch]);

  // const initiateFetchRequests = useCallback(() => {
  //   fetchRequests();
  // }, [fetchRequests]);

  // useEffect(() => {
  //   initiateFetchRequests();
  // }, [initiateFetchRequests]);

  // const handleRetry = () => {
  //   initiateFetchRequests();
  // };
  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: "Reference No.",
  //       accessor: "referenceNo",
  //     },
  //     {
  //       Header: "Address to",
  //       accessor: "addressTo",
  //     },
  //     {
  //       Header: "Purpose",
  //       accessor: "purpose",
  //     },
  //     {
  //       Header: "Issued on",
  //       accessor: (d) => new Date(d.issuedOn).toLocaleDateString(),
  //       sortType: (rowA, rowB, id, desc) => {
  //         return new Date(rowA.original[id]) > new Date(rowB.original[id])
  //           ? 1
  //           : -1;
  //       },
  //     },
  //     {
  //       Header: "Status",
  //       accessor: "status",
  //     },
  //   ],
  //   []
  // );

  // const data = useMemo(() => requests, [requests]);

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({ columns, data });

  // if (loading) return <p>Loading...</p>;
  // if (error)
  //   return (
  //     <div>
  //       <p>Error loading requests: {error}</p>
  //       <button onClick={handleRetry}>Retry</button>
  //     </div>
  //   );

  return (
    <Datatable
      title="Employees"
      columns={requestsColumns}
      records={requestsRecords}
      config={requestsConfig}
      isLoading={isLoading}
      actions={[]}
    />
  );
}

export default RequestsList;
