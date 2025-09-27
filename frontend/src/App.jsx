import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from "./pages/Auth"
import GovDashboard from "./pages/GovDashboard"


function About() {
  return <h1>About Page</h1>; }

function App() {
  
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/sign" element={<Auth />} />
        <Route path="/dashboard" element={<GovDashboard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
