import { motion } from 'framer-motion'

export default function StatCard({ title, value, icon: Icon, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="stat-card group hover:border-cyan-500"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-2">{title}</p>
          {loading ? (
            <div className="h-8 bg-slate-700 rounded animate-pulse w-20" />
          ) : (
            <p className="text-3xl md:text-4xl font-bold text-cyan-400">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
          )}
        </div>
        <div className="p-3 bg-indigo-900 bg-opacity-50 rounded-lg group-hover:bg-cyan-900 group-hover:bg-opacity-50 transition-all duration-300">
          {Icon && <Icon className="w-6 h-6 text-cyan-400" />}
        </div>
      </div>
    </motion.div>
  )
}
