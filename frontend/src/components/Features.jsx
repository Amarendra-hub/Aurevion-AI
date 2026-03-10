import { motion } from 'framer-motion'
import { Sparkles, Palette, MessageSquare, TrendingUp } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Sparkles,
      title: 'Brand Name Generator',
      description:
        'Generate creative and unique brand names tailored to your business using advanced AI algorithms.',
    },
    {
      icon: Palette,
      title: 'AI Logo Design',
      description:
        'Create stunning, professional logos using Stable Diffusion—no design skills needed.',
    },
    {
      icon: MessageSquare,
      title: 'Marketing Content',
      description:
        'Generate product descriptions, taglines, and social media captions powered by Google Gemini.',
    },
    {
      icon: TrendingUp,
      title: 'Sentiment Analysis',
      description:
        'Analyze customer feedback automatically to understand brand perception and sentiment.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for Modern Brands
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything you need to build a professional brand identity with AI
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass group hover:bg-opacity-80 transition-all duration-300 p-6 rounded-xl hover:border-cyan-500 border border-slate-700"
              >
                <div className="mb-4 inline-block p-3 bg-indigo-900 bg-opacity-50 rounded-lg group-hover:bg-cyan-900 group-hover:bg-opacity-50 transition-all duration-300">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
