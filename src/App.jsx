

import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Login } from './pages/Login'
import Trace from './pages/Trace'
import './App.css'
import { Homepage } from './pages/Homepage'
import FarmerDashboard from './pages/FarmerDashboard'
import RetailerDashboard from './pages/RetailerDashboard'
import DistributorDashboard from './pages/DistributorDashboard'
import Register from './pages/Register'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trace" element={<Trace />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/distributor-dashboard" element={<DistributorDashboard />} />
        <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
