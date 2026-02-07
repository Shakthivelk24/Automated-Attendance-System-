import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GovDashboard from "./pages/GovDashboard";
import TeacherDashboard from "./pages/TD1";
import TD2 from "./pages/TD2";
import TD3 from "./pages/TD3";
import SchoolAuth from "../Authentication/SchoolAuth";
import GovernmentAuth from "../Authentication/GovernmentAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/schoolAuth" element={<SchoolAuth />} />
        <Route path="/governmentAuth" element={<GovernmentAuth />} />
        <Route path="/gov-dashboard" element={<GovDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-dashboard/td2/:class/:section" element={<TD2 />} />
        <Route path="/teacher-dashboard/td3" element={<TD3 />} />
      </Routes>
    </>
  );
}

export default App;
