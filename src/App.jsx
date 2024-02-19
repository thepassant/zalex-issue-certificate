import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CertificateRequestForm from "./components/CertificateRequestForm";
import RequestsList from "./components/RequestsList";
import Button from "./components/Button";

function App() {
  return (
    <>
      <Router>
        <div>
          <nav>
            <Link to="/create-request">
              <Button className="button">Create Certificate Request</Button>
            </Link>
            <Link to="/view-requests">
              <Button className="button">View Submitted Requests</Button>
            </Link>
          </nav>

          <Routes>
            <Route
              path="/create-request"
              element={<CertificateRequestForm />}
            />
            <Route path="/view-requests" element={<RequestsList />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
