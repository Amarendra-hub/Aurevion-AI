import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function QuickActions({ tools }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool, index) => (
          <Link
            key={index}
            to={tool.link}
            className="glass group hover:bg-opacity-80 transition-all duration-300 p-4 rounded-lg border border-slate-700 hover:border-cyan-500 hover:border-opacity-50"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {tool.title.split(' ')[0]} {tool.title.split(' ')[1]}
              </span>
              <ArrowRight size={18} className="text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
