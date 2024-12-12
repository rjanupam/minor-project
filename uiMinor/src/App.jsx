import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import DiagnosisPage from "./pages/DiagnosisPage";
import HistoryPage from "./pages/HistoryPage";
import ImageUploadPage from "./pages/ImageUploadPage";

// prolly remove these
import SearchReport from "./components/searchReport";
import CreateReport from "./pages/createReport";
import SearchPatient from "./components/searchPatient";
import CreatePatient from "./components/createPatient";

function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/DiagnosisPage" element={<DiagnosisPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/ImageUploadPage" element={<ImageUploadPage />} />

        <Route path="/search_report" element={<SearchReport />} />
        <Route path="/create_report" element={<CreateReport />} />
        <Route path="/search_patient" element={<SearchPatient />} />
        <Route path="/create_patient" element={<CreatePatient />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
