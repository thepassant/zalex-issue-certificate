import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Datatable from "./datatable/Datatable";
import { fetchRequestsList } from "../redux/requests/asyncActions/RequestAsyncActions";
import {
  getRequestsIsLoading,
  getRequestsList,
} from "../redux/requests/selectors/RequestSelectors";
import DownloadIcon from "./icons/DownloadIcon";
import UpdateIcon from "./icons/UpdateIcon";
import {
  openDownloadRequestModal,
  openEditRequestModal,
  setTargetRequestData,
} from "../redux/requests/slices/RequestSlice";
import EditRequestModal from "./EditRequestModal";
import DownloadRequestModal from "./DownloadRequestModal";

const getRequestsDataTableConfig = (
  requestsDetails,
  downloadRequest,
  editRequest
) => {
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
                ? "warn"
                : "info"
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
    },
    requestsActions = [
      {
        icon: <DownloadIcon />,
        hidden: (rowData) => rowData.status.toLowerCase() !== "done",
        tooltipContent: "Download",
        onClick: (e, rowData) => {
          downloadRequest(rowData);
        },
      },
      {
        icon: <UpdateIcon />,
        hidden: (rowData) => rowData.status.toLowerCase() !== "new",
        tooltipContent: "Edit",
        onClick: (e, rowData) => {
          editRequest(rowData);
        },
      },
    ];

  return { requestsColumns, requestsRecords, requestsConfig, requestsActions };
};

function RequestsList() {
  const dispatch = useDispatch(),
    requestsList = useSelector(getRequestsList),
    isLoading = useSelector(getRequestsIsLoading);

  useEffect(() => {
    dispatch(fetchRequestsList());
  }, [dispatch]);

  const downloadRequest = (rowData) => {
    dispatch(setTargetRequestData(rowData));
    dispatch(openDownloadRequestModal());
  };

  const editRequest = (rowData) => {
    dispatch(setTargetRequestData(rowData));
    dispatch(openEditRequestModal());
  };
  const { requestsColumns, requestsRecords, requestsConfig, requestsActions } =
    getRequestsDataTableConfig(requestsList, downloadRequest, editRequest);

  return (
    <>
      <Datatable
        title="Certificate Requests"
        columns={requestsColumns}
        records={requestsRecords}
        config={requestsConfig}
        isLoading={isLoading}
        actions={requestsActions}
      />
      <EditRequestModal />
      <DownloadRequestModal />
    </>
  );
}

export default RequestsList;
