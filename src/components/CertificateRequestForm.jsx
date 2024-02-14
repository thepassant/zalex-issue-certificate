import { useState } from "react";
import { connect } from "react-redux";
import { submitCertificateRequest } from "../redux/actions/certificateActions";

function CertificateRequestForm({
  submitCertificateRequest,
  submissionStatus,
  loading,
  error,
}) {
  const [formData, setFormData] = useState({
    addressTo: "",
    purpose: "",
    issuedOn: "",
    employeeId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCertificateRequest(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <button type="submit">Request Certificate</button>
      </form>
      {loading && <p>Submitting...</p>}
      {submissionStatus === "success" && (
        <p>Your certificate request has been submitted successfully.</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  submissionStatus: state.certificate.submissionStatus,
  loading: state.certificate.loading,
  error: state.certificate.error,
});

const mapDispatchToProps = {
  submitCertificateRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CertificateRequestForm);