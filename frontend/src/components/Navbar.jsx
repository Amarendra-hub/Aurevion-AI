import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

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
            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            <Sparkles className="w-8 h-8 text-indigo-500" />
            <span>Aurevion</span>
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

          {/* CTA Button */}
          {isPublic && (
            <Link
              to="/dashboard"
              className="hidden md:block btn-primary"
            >
              Get Started
            </Link>
          )}

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
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block mt-2 btn-primary text-center"
              >
                Get Started
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
