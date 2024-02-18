import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Datatable from "./datatable/Datatable";
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
        render: (rowData) => (
          <p
            className={`status ${
              rowData.status.toLowerCase() === "done"
                ? "success"
                : rowData.status.toLowerCase() === "pending"
                ? "danger"
                : rowData.status.toLowerCase() === "new"
                ? "info"
                : "warn"
            }`}
          >
            {rowData.status}
          </p>
        ),
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

  return { requestsColumns, requestsRecords, requestsConfig };
};

function RequestsList() {
  const requestsList = useSelector(getRequestsList),
    isLoading = useSelector(getRequestsIsLoading),
    { requestsColumns, requestsRecords, requestsConfig } =
      getRequestsDataTableConfig(requestsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRequestsList());
  }, [dispatch]);
  return (
    <Datatable
      title="Certificate Requests"
      columns={requestsColumns}
      records={requestsRecords}
      config={requestsConfig}
      isLoading={isLoading}
      actions={[]}
    />
  );
}

export default RequestsList;
