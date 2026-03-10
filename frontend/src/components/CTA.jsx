import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Background elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass relative z-20 p-12 rounded-2xl border border-cyan-500 border-opacity-30 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators and entrepreneurs already using Aurevion AI
            to build powerful brand identities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/dashboard" className="btn-primary text-lg font-semibold flex items-center gap-2 group">
              Start Free Today
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="btn-outline text-lg font-semibold">
              Schedule a Demo
            </button>
          </div>

          <p className="mt-8 text-slate-400">
            No credit card required • Takes 2 minutes to set up
          </p>
        </motion.div>
      </div>
    </section>
  )
}
