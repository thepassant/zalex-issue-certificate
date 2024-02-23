import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import {
  getRequestsIsEditModalActive,
  getRequestsTargetRequestData,
} from "../redux/requests/selectors/RequestSelectors";
import {
  closeEditRequestModal,
  editRequestItem,
  setTargetRequestData,
} from "../redux/requests/slices/RequestSlice";
import { useEffect, useState } from "react";
const EditRequestModal = () => {
  const dispatch = useDispatch(),
    requestDataToEdit = useSelector(getRequestsTargetRequestData),
    isModalOpen = useSelector(getRequestsIsEditModalActive),
    [purpose, setPurpose] = useState("");

  useEffect(() => {
    if (isModalOpen && requestDataToEdit?.purpose) {
      setPurpose(requestDataToEdit.purpose);
    }
  }, [isModalOpen, requestDataToEdit?.purpose]);

  const closeModal = () => {
    dispatch(closeEditRequestModal());
    dispatch(setTargetRequestData(null));
  };

  const editRequestHandler = () => {
    dispatch(
      editRequestItem({ reference_no: requestDataToEdit.reference_no, purpose })
    );
    closeModal();
  };

  const footerButtons = [
    {
      onClick: editRequestHandler,
      label: "Update",
    },
    {
      onClick: closeModal,
      label: "Cancel",
      variant: "danger",
    },
  ];

  const updatePurposeHandler = ({ target: { value } }) => {
    setPurpose(value);
  };

  return (
    <Modal
      header={{
        title: "Edit Request",
      }}
      footer={{
        footerButtons,
      }}
      wrapper={{
        show: isModalOpen,
        closeHandler: closeModal,
      }}
    >
      <div className="edit-modal"></div>
      <div className="view">
        <label htmlFor="referenceNo">Reference No:</label>
        <input
          className="disabled"
          type="text"
          id="referenceNo"
          name="referenceNo"
          value={requestDataToEdit?.reference_no}
          disabled
        />
      </div>

      <div className="view">
        <label htmlFor="addressTo">Address to:</label>
        <textarea
          className="disabled"
          id="addressTo"
          name="addressTo"
          value={requestDataToEdit?.address_to}
          disabled
        />
      </div>

      <div className="view">
        <label htmlFor="purpose">Purpose:</label>
        <textarea
          id="purpose"
          name="purpose"
          value={purpose}
          onChange={updatePurposeHandler}
          autoFocus
        />
      </div>

      <div className="view">
        <label htmlFor="status">Status:</label>
        <input
          className="disabled"
          type="text"
          id="status"
          name="status"
          value={requestDataToEdit?.status}
          disabled
        />
      </div>
    </Modal>
  );
};

export default EditRequestModal;
