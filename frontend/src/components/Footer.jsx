import { Link } from 'react-router-dom'
import { Heart, Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="glass border-t border-slate-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Aurevion AI</h3>
            <p className="text-slate-400 text-sm">
              Build your brand with artificial intelligence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-cyan-400 transition">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-4">Follow</h4>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
                <Github size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            &copy; 2024 Aurevion AI. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm flex items-center gap-1 mt-4 md:mt-0">
            Made with <Heart size={16} className="text-red-500" /> by Amarendra Hub
          </p>
        </div>
      </div>
    </footer>
  )
}
