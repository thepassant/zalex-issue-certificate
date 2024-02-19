import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import {
  getRequestsIsEditModalActive,
  getRequestsTargetRequestData,
} from "../redux/requests/selectors/RequestSelectors";
import {
  closeEditRequestModal,
  setTargetRequestData,
} from "../redux/requests/slices/RequestSlice";

const EditRequestModal = () => {
  const dispatch = useDispatch(),
    requestDataToEdit = useSelector(getRequestsTargetRequestData),
    isModalOpen = useSelector(getRequestsIsEditModalActive);

  const closeModal = () => {
    dispatch(closeEditRequestModal());
    dispatch(setTargetRequestData(null));
  };

  const editRequestHandler = () => {
    console.log("requestDataToEdit", requestDataToEdit);
  };

  const footerButtons = [
    {
      onClick: editRequestHandler,
      label: "submit",
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
      I'm the edit modal
    </Modal>
  );
};

export default EditRequestModal;
