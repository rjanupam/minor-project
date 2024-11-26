import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import DiagnosisPage from './pages/DiagnosisPage';
import HistoryPage from './pages/HistoryPage';
import SignUpSignInPage from './pages/SignUpSignInPage';
import ImageUploadPage from './pages/ImageUploadPage';

function App() {
  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/DiagnosisPage" element={<DiagnosisPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/SignUpSignInPage" element={<SignUpSignInPage />} />
        <Route path="/ImageUploadPage" element={<ImageUploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
