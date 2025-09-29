<<<<<<< HEAD
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from "./pages/Auth"
import GovDashboard from "./pages/GovDashboard"


function About() {
  return <h1>About Page</h1>; }
>>>>>>> e33c1297d62ae3bc9f3dda6c7a2c26d5a564c9c1

function App() {
  
  return (
    <>
<<<<<<< HEAD
      <LandingPage/>
=======
      <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/sign" element={<Auth />} />
        <Route path="/dashboard" element={<GovDashboard />} />
      </Routes>
    </Router>
>>>>>>> e33c1297d62ae3bc9f3dda6c7a2c26d5a564c9c1
    </>
  )
}

export default App
