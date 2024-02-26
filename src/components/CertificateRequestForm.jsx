import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { submitCertificateRequest } from "../redux/certificate/asyncActions/CertificateAsyncActions";
import "react-toastify/dist/ReactToastify.css";
import {
  getCertificateIsLoading,
  getCertificateSubmissionStatus,
} from "../redux/certificate/selectors/CertificateSelectors";
import { useEffect } from "react";
function CertificateRequestForm() {
  const loading = useSelector(getCertificateIsLoading),
    submissionStatus = useSelector(getCertificateSubmissionStatus),
    dispatch = useDispatch(),
    {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (submissionStatus === "success") {
      reset();
    }
  }, [submissionStatus]);

  const onSubmitForm = (formData) => {
    dispatch(submitCertificateRequest(formData));
  };
  const validateFutureDate = (inputDate) => {
    const currentDate = new Date();
    const selectedDate = new Date(inputDate);
    currentDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate > currentDate || "The date must be in the future";
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="control">
          <label>Address to</label>
          <textarea
            {...register("addressTo", {
              required: {
                value: true,
                message: "Address to field is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Only alphanumeric characters are allowed",
              },
            })}
          />
          <div className="control-error">
            {errors.addressTo && <p>{errors.addressTo.message}</p>}
          </div>
        </div>
        <div className="control">
          <label>Purpose</label>
          <textarea
            {...register("purpose", {
              required: { value: true, message: "Purpose field is required" },
              minLength: { value: 50, message: "Minimum length should be 50" },
            })}
          />
          <div className="control-error">
            {errors.purpose && <p>{errors.purpose.message}</p>}
          </div>
        </div>
        <div className="control">
          <label>Issued on</label>
          <input
            type="date"
            {...register("issuedOn", {
              valueAsDate: true,
              required: { value: true, message: "Issued on field is required" },
              validate: validateFutureDate,
            })}
          />
          <div className="control-error">
            {errors.issuedOn && <p>{errors.issuedOn.message}</p>}
          </div>
        </div>
        <div className="control">
          <label>Employee ID</label>
          <input
            {...register("employeeId", {
              required: {
                value: true,
                message: "Employee ID field is required",
              },
              pattern: {
                value: /^\d+$/,
                message: "Only numbers are allowed",
              },
            })}
          />
          <div className="control-error">
            {errors.employeeId && <p>{errors.employeeId.message}</p>}
          </div>
        </div>
        <button type="submit" className="submit-button">
          Request Certificate
        </button>
      </form>
    </>
  );
}

export default CertificateRequestForm;
