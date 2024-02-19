import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitCertificateRequest } from "../redux/certificate/asyncActions/CertificateAsyncActions";
import {
  getCertificateIsLoading,
  getCertificateSubmissionStatus,
} from "../redux/certificate/selectors/CertificateSelectors";

function CertificateRequestForm() {
  const loading = useSelector(getCertificateIsLoading);
  const submissionStatus = useSelector(getCertificateSubmissionStatus);
  const dispatch = useDispatch(),
    [formData, setFormData] = useState({
      addressTo: "",
      purpose: "",
      issuedOn: "",
      employeeId: "",
    });

  console.log(submissionStatus);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitCertificateRequest(formData));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="control">
          <label htmlFor="addressTo">Address to</label>
          <textarea
            id="addressTo"
            name="addressTo"
            value={formData.addressTo}
            onChange={handleInputChange}
            required
            pattern="[A-Za-z0-9\s]+"
          />
        </div>
        <div className="control">
          <label htmlFor="purpose">Purpose</label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            required
            minLength="50"
            style={{ minHeight: "100px" }}
          />
        </div>
        <div className="control">
          <label htmlFor="issuedOn">Issued on</label>
          <input
            type="date"
            id="issuedOn"
            name="issuedOn"
            value={formData.issuedOn}
            onChange={handleInputChange}
            required
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="control">
          <label htmlFor="employeeId">Employee ID</label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleInputChange}
            required
            pattern="\d+"
          />
        </div>
        <button type="submit" className="button">
          Request Certificate
        </button>
      </form>
      {loading && <p>Submitting...</p>}
      {submissionStatus === "success" && (
        <p>Your certificate request has been submitted successfully.</p>
      )}
      {/* {submissionStatus === "success" && (
        <p>Your certificate request has been submitted successfully.</p>
      )}
      {/* {error && <p>Error: {error}</p>} */}
    </>
  );
}

export default CertificateRequestForm;
