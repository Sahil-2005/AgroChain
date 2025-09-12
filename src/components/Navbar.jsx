import { useState } from "react"
import {
  Leaf,
  Menu,
  X,
} from "lucide-react"
import { Link } from "react-router-dom"

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-500" />
            <span className="font-bold text-2xl text-green-700">AgroTrace</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/trace" className="text-gray-600 hover:text-green-700 transition-colors">
              Trace Produce
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 border rounded-md hover:bg-green-100 text-green-700 transition-colors">Register</button>
            </Link>
            <Link to="/login">
              <button className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors">Login</button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 flex flex-col space-y-2">
            <Link
              to="/trace"
              className="text-gray-600 hover:text-green-700 transition-colors px-2 py-2 rounded bg-shadow-sm"
              onClick={() => setMenuOpen(false)}
            >
              Trace Produce
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              <button className="w-full px-4 py-2 border rounded-md hover:bg-green-100 text-green-700 transition-colors">Register</button>
            </Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="w-full px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors">Login</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}