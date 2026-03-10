import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Sign Up',
      description: 'Create your free account and get instant access to all AI tools.',
    },
    {
      number: '02',
      title: 'Choose a Tool',
      description:
        'Select from our suite of brand generators and analysis tools.',
    },
    {
      number: '03',
      title: 'Input Details',
      description:
        'Provide information about your brand, business, or content needs.',
    },
    {
      number: '04',
      title: 'Get Results',
      description:
        'Receive AI-generated results instantly and refine as needed.',
    },
  ]

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Simple, intuitive, and powerful—get results in just a few steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass p-6 rounded-xl border border-slate-700 h-full">
                <div className="text-5xl font-bold text-indigo-400 mb-4 opacity-50">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm">{step.description}</p>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="hidden lg:absolute top-1/2 -right-6 transform -translate-y-1/2"
                >
                  <ChevronRight size={24} className="text-cyan-400" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
