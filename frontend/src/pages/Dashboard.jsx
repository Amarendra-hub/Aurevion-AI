import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Palette, MessageSquare, TrendingUp, ArrowRight, Activity } from 'lucide-react'
import { useQuery } from 'react-query'
import { getDashboardStats, getRecentActivity } from '../services/api'
import StatCard from '../components/StatCard'
import QuickActions from '../components/QuickActions'
import RecentActivity from '../components/RecentActivity'

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery('dashboardStats', getDashboardStats)
  const { data: activity, isLoading: activityLoading } = useQuery('recentActivity', getRecentActivity)

  const tools = [
    {
      icon: Sparkles,
      title: 'Brand Name Generator',
      description: 'Generate creative brand names',
      link: '/dashboard/brand-name',
      color: 'indigo',
    },
    {
      icon: Palette,
      title: 'Logo Generator',
      description: 'Create AI logos',
      link: '/dashboard/logo',
      color: 'purple',
    },
    {
      icon: MessageSquare,
      title: 'Content Generator',
      description: 'Write marketing content',
      link: '/dashboard/content',
      color: 'cyan',
    },
    {
      icon: TrendingUp,
      title: 'Sentiment Analysis',
      description: 'Analyze customer feedback',
      link: '/dashboard/sentiment',
      color: 'green',
    },
  ]

  return (
    <main className="pt-20 min-h-screen pb-20">
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back! Here's what you've created today.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <StatCard
            title="Brand Names Generated"
            value={stats?.brand_names_count || 0}
            icon={Sparkles}
            loading={statsLoading}
          />
          <StatCard
            title="Logos Created"
            value={stats?.logos_count || 0}
            icon={Palette}
            loading={statsLoading}
          />
          <StatCard
            title="Content Pieces"
            value={stats?.content_count || 0}
            icon={MessageSquare}
            loading={statsLoading}
          />
          <StatCard
            title="Sentiment Analyses"
            value={stats?.sentiment_count || 0}
            icon={TrendingUp}
            loading={statsLoading}
          />
        </motion.div>

        {/* Quick Actions */}
        <QuickActions tools={tools} />

        {/* Main Tools Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">All Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="glass group hover:border-cyan-500 transition-all duration-300 p-6 rounded-xl border border-slate-700"
                >
                  <div className={`mb-4 inline-block p-3 bg-${tool.color}-900 bg-opacity-50 rounded-lg group-hover:bg-opacity-70 transition-all duration-300`}>
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {tool.description}
                  </p>
                  <Link
                    to={tool.link}
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
                  >
                    Open Tool
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <RecentActivity activity={activity} loading={activityLoading} />
      </section>
    </main>
  )
}
