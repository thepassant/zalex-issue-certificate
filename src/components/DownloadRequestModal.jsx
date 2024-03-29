import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { PDFViewer, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import {
  getRequestsIsDownloadModalActive,
  getRequestsTargetRequestData,
} from "../redux/requests/selectors/RequestSelectors";
import {
  closeDownloadRequestModal,
  setTargetRequestData,
} from "../redux/requests/slices/RequestSlice";
import MyDocument from "./MyDocument";

const styles = StyleSheet.create({
  pdfViewer: {
    width: "100%",
    height: "100%",
  },
  pdfDownloadLink: {
    color: "#ffffff",
    textDecoration: "none",
  },
});

const DownloadRequestModal = () => {
  const dispatch = useDispatch(),
    requestDataToDownload = useSelector(getRequestsTargetRequestData),
    isModalOpen = useSelector(getRequestsIsDownloadModalActive);

  const closeModal = () => {
    dispatch(closeDownloadRequestModal());
    dispatch(setTargetRequestData(null));
  };

  const footerButtons = [
    {
      label: (
        <PDFDownloadLink
          style={styles.pdfDownloadLink}
          document={
            <MyDocument requestDataToDownload={requestDataToDownload} />
          }
          fileName={`${
            requestDataToDownload
              ? requestDataToDownload.address_to
              : "Certificate"
          }.pdf`}
        >
          {({ loading }) => (loading ? "Loading document..." : "Download")}
        </PDFDownloadLink>
      ),
    },
    {
      onClick: closeModal,
      label: "cancel",
      variant: "danger",
    },
  ];

  return (
    <Modal
      header={{
        title: "Download Request",
      }}
      footer={{
        footerButtons,
      }}
      wrapper={{
        show: isModalOpen,
        closeHandler: closeModal,
        wrapperClassName: "download-modal-wrapper",
      }}
    >
      <PDFViewer style={styles.pdfViewer}>
        <MyDocument requestDataToDownload={requestDataToDownload} />
      </PDFViewer>
    </Modal>
  );
};

export default DownloadRequestModal;
