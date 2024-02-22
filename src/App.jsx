import { Routes, Route, useNavigate } from "react-router-dom";
import CertificateRequestForm from "./components/CertificateRequestForm";
import RequestsList from "./components/RequestsList";
import Button from "./components/Button";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <nav style={{ display: "flex", justifyContent: "center", padding: 15 }}>
        <Button
          label="Create Certificate Request"
          onClick={() => navigate("/create-request")}
        />
        <Button
          label="View Submitted Requests"
          onClick={() => navigate("/view-requests")}
        />
      </nav>

      <Routes>
        <Route path="/create-request" element={<CertificateRequestForm />} />
        <Route path="/view-requests" element={<RequestsList />} />
      </Routes>
    </div>
  );
}

export default App;
