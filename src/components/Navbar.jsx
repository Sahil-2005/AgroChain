import { useState } from "react"
import {
  Leaf,
  Menu,
  X,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
              <Leaf className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-bold text-2xl text-green-700 group-hover:text-green-800 transition-colors duration-300">AgroChain</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/trace" className="text-gray-600 hover:text-green-700 transition-all duration-300 hover:scale-105">
              Trace Produce
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to={`/${user?.role}-dashboard`}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 btn-animate shadow-md"
                >
                  Go to Dashboard
                </Link>
                <span className="text-gray-600 font-medium">Hi, {user?.name}</span>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 btn-animate"
                >Logout</button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <button className="px-4 py-2 border border-green-300 rounded-lg hover:bg-green-100 text-green-700 hover:border-green-400 transition-all duration-300 btn-animate">Register</button>
                </Link>
                <Link to="/login">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 btn-animate">Login</button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="transition-transform duration-300">
              {menuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 p-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 slide-in-up">
            <div className="flex flex-col space-y-3">
              <Link
                to="/trace"
                className="text-gray-600 hover:text-green-700 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-green-50"
                onClick={() => setMenuOpen(false)}
              >
                Trace Produce
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to={`/${user?.role}-dashboard`}
                    onClick={() => setMenuOpen(false)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 text-center font-medium shadow-md"
                  >
                    Go to Dashboard
                  </Link>
                  <button 
                    onClick={() => { setMenuOpen(false); logout(); navigate('/'); }} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    <button className="w-full px-4 py-3 border border-green-300 rounded-lg hover:bg-green-100 text-green-700 hover:border-green-400 transition-all duration-300">Register</button>
                  </Link>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-300">Login</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}