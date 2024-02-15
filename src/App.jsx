import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CertificateRequestForm from "./components/CertificateRequestForm";
import RequestsList from "./components/RequestsList";

function App() {
  return (
    <>
      <Router>
        <div>
          <nav>
            <Link to="/create-request">
              <button>Create Certificate Request</button>
            </Link>
            <Link to="/view-requests">
              <button>View Submitted Requests</button>
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
