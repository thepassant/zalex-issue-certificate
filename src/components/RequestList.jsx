import { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { fetchRequests } from "../redux/actions/requestActions";

function RequestsList({ fetchRequests, requests, loading, error }) {
  const initiateFetchRequests = useCallback(() => {
    fetchRequests();
  }, [fetchRequests]);

  useEffect(() => {
    initiateFetchRequests();
  }, [initiateFetchRequests]);

  const handleRetry = () => {
    initiateFetchRequests();
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div>
        <p>Error loading requests: {error}</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    );

  return (
    <table>
      <thead>
        <tr>
          <th>Reference No.</th>
          <th>Address to</th>
          <th>Purpose</th>
          <th>Issued on</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request.id}>
            <td>{request.referenceNo}</td>
            <td>{request.addressTo}</td>
            <td>{request.purpose}</td>
            <td>{new Date(request.issuedOn).toLocaleDateString()}</td>
            <td>{request.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const mapStateToProps = (state) => ({
  requests: state.request.requests,
  loading: state.request.loading,
  error: state.request.error,
});

const mapDispatchToProps = {
  fetchRequests,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsList);
