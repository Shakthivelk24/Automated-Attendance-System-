import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from "./pages/LandingPage"
import Auth from "./pages/Auth"
import GovDashboard from "./pages/GovDashboard"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign" element={<Auth />} />
          <Route path="/dashboard" element={<GovDashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
