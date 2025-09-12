

import { Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Login } from './pages/Login'
import Trace from './pages/Trace'
import './App.css'
import { Homepage } from './pages/Homepage'
import FarmerDashboard from './pages/FarmerDashboard'
import RetailerDashboard from './pages/RetailerDashboard'
import DistributorDashboard from './pages/DistributorDashboard'
import Register from './pages/Register'
import { AuthProvider, useAuth } from './auth/AuthContext'

function ProtectedRoute({ children, allow }) {
  const { isAuthenticated, user } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (allow && user?.role && !allow.includes(user.role)) {
    return <Navigate to={`/${user.role}-dashboard`} replace />
  }
  return children
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trace" element={<Trace />} />
          <Route path="/farmer-dashboard" element={<ProtectedRoute allow={["farmer"]}><FarmerDashboard /></ProtectedRoute>} />
          <Route path="/distributor-dashboard" element={<ProtectedRoute allow={["distributor"]}><DistributorDashboard /></ProtectedRoute>} />
          <Route path="/retailer-dashboard" element={<ProtectedRoute allow={["retailer"]}><RetailerDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
