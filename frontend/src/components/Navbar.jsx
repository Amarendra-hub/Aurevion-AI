import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()

  const isPublic = location.pathname === '/' || location.pathname === '/about' || location.pathname === '/contact'

  const publicLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const dashboardLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Brand Names', href: '/dashboard/brand-name' },
    { name: 'Logo', href: '/dashboard/logo' },
    { name: 'Content', href: '/dashboard/content' },
    { name: 'Sentiment', href: '/dashboard/sentiment' },
    { name: 'Settings', href: '/dashboard/settings' },
  ]

  const links = isPublic ? publicLinks : dashboardLinks

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass fixed top-0 w-full z-50 border-b border-slate-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold hover:scale-105 transition-transform"
          >
            <Logo className="w-10 h-10" />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Aurevion</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative py-2 px-1 transition-colors duration-200 ${
                  location.pathname === link.href
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA / Auth Buttons */}
          <div className="hidden md:flex gap-3">
            {isPublic ? (
              <>
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-slate-300 hover:text-white transition"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="btn-primary"
                    >
                      Get Started
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="text-slate-400 py-2">Welcome, {user?.username}!</span>
                    <Link
                      to="/dashboard"
                      className="btn-primary"
                    >
                      Dashboard
                    </Link>
                  </>
                )}
              </>
            ) : (
              isAuthenticated && (
                <>
                  <span className="text-slate-400 py-2">Welcome, {user?.username}!</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-slate-300 hover:text-red-400 transition"
                  >
                    Logout
                  </button>
                </>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-slate-700"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-4 rounded transition-colors ${
                  location.pathname === link.href
                    ? 'bg-indigo-900 bg-opacity-50 text-cyan-400'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isPublic && (
              <>
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 px-4 rounded transition-colors text-slate-300 hover:bg-slate-700"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block mt-2 btn-primary text-center"
                    >
                      Get Started
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="block py-2 px-4 text-slate-400">Welcome, {user?.username}!</span>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block btn-primary text-center"
                    >
                      Dashboard
                    </Link>
                  </>
                )}
              </>
            )}
            {!isPublic && isAuthenticated && (
              <>
                <span className="block py-2 px-4 text-slate-400">Welcome, {user?.username}!</span>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 px-4 rounded transition-colors text-slate-300 hover:bg-slate-700 hover:text-red-400"
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
