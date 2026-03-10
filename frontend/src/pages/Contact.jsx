import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <main className="pt-20 min-h-screen pb-20">
      <section className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-8 text-center">Get in Touch</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Email</h3>
                    <p className="text-slate-400">support@aurevion.ai</p>
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Phone</h3>
                    <p className="text-slate-400">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Address</h3>
                    <p className="text-slate-400">San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="glass p-8 rounded-xl space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="input-field w-full"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="input-field w-full"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="input-field w-full resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button type="submit" className="btn-primary w-full text-center">
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
