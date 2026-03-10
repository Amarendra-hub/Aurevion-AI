import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { Sparkles, Palette, MessageSquare, TrendingUp } from 'lucide-react'

export default function RecentActivity({ activity, loading }) {
  const iconMap = {
    brand_name: Sparkles,
    logo: Palette,
    content: MessageSquare,
    sentiment: TrendingUp,
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="glass p-6 rounded-xl">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-slate-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
      <div className="glass p-6 rounded-xl border border-slate-700">
        {activity && activity.length > 0 ? (
          <div className="space-y-4">
            {activity.map((item, index) => {
              const Icon = iconMap[item.type] || Sparkles
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 pb-4 border-b border-slate-700 last:border-0"
                >
                  <div className="p-2 bg-indigo-900 bg-opacity-50 rounded-lg mt-1">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                  <span className="text-slate-500 text-sm whitespace-nowrap">
                    {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                  </span>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-8">No recent activity</p>
        )}
      </div>
    </motion.div>
  )
}
