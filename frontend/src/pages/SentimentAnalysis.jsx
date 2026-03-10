import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from 'react-query'
import { TrendingUp } from 'lucide-react'
import { analyzeSentiment } from '../services/api'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

export default function SentimentAnalysis() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)

  const mutation = useMutation(analyzeSentiment, {
    onSuccess: (data) => {
      setResult(data)
    },
  })

  const handleAnalyze = async (e) => {
    e.preventDefault()
    mutation.mutate(text)
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return '#10b981'
      case 'negative':
        return '#ef4444'
      case 'neutral':
        return '#8b5cf6'
      default:
        return '#6b7280'
    }
  }

  const chartData = result ? [
    { name: 'Positive', value: result.positive_score || 0 },
    { name: 'Neutral', value: result.neutral_score || 0 },
    { name: 'Negative', value: result.negative_score || 0 },
  ] : []

  const COLORS = ['#10b981', '#8b5cf6', '#ef4444']

  return (
    <main className="pt-20 min-h-screen pb-20">
      <section className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl font-bold">Sentiment Analysis</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Analyze customer feedback and understand brand perception
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleAnalyze}
            className="glass p-6 rounded-xl lg:col-span-1 h-fit sticky top-24"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Customer Feedback *
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="input-field w-full resize-none"
                  rows="6"
                  placeholder="Paste customer reviews, feedback, or comments here..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={mutation.isLoading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
              </button>
            </div>
          </motion.form>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {result ? (
              <div className="space-y-6">
                {/* Sentiment Summary */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="glass p-6 rounded-xl border-2"
                  style={{
                    borderColor: getSentimentColor(result.sentiment),
                  }}
                >
                  <h3 className="text-sm font-medium text-slate-400 mb-2">Overall Sentiment</h3>
                  <div className="flex items-center justify-between">
                    <p
                      className="text-4xl font-bold"
                      style={{ color: getSentimentColor(result.sentiment) }}
                    >
                      {result.sentiment}
                    </p>
                    <p className="text-3xl font-bold text-indigo-400">
                      {(result.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </motion.div>

                {/* Charts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="glass p-6 rounded-xl"
                >
                  <h3 className="text-xl font-semibold text-white mb-6">Sentiment Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${(value * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => `${(value * 100).toFixed(1)}%`}
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          border: '1px solid #64748b',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Detailed Analysis */}
                {result.analysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="glass p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Analysis</h3>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {result.analysis}
                    </p>
                  </motion.div>
                )}
              </div>
            ) : mutation.isLoading ? (
              <div className="glass p-12 rounded-xl text-center">
                <div className="inline-block">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-600 border-t-green-400 animate-spin" />
                </div>
                <p className="mt-4 text-slate-400">Analyzing sentiment...</p>
              </div>
            ) : (
              <div className="glass p-12 rounded-xl text-center">
                <p className="text-slate-400">
                  Paste customer feedback above to analyze sentiment
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
