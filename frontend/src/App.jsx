import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from "./pages/LandingPage"
import Auth from "./pages/Auth"
import GovDashboard from "./pages/GovDashboard"
import TeacherDashboard from "./pages/TD1"
import TD2 from "./pages/TD2"
import TD3 from "./pages/TD3"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign" element={<Auth />} />
          <Route path="/dashboard" element={<GovDashboard />} />
          <Route path="/TD1" element={<TeacherDashboard/>} />
          <Route path="/TD2" element={<TD2/>} />
          <Route path="/TD3" element={<TD3/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
