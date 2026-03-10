import { motion } from 'framer-motion'

export default function About() {
  return (
    <main className="pt-20 min-h-screen">
      <section className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-8">About Aurevion AI</h1>

          <div className="space-y-6 text-lg text-slate-300 glass p-8 rounded-xl">
            <p>
              Aurevion AI is a modern Generative AI–powered branding automation platform
              designed for startups, creators, and entrepreneurs who want to build professional
              brand identities without the cost of hiring expensive agencies.
            </p>

            <p>
              We combine cutting-edge AI technologies—Google Gemini, Stable Diffusion, and
              HuggingFace—to deliver powerful branding tools that are fast, affordable, and
              easy to use.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-cyan-400">Our Mission</h2>
            <p>
              To democratize brand building by making AI-powered design and content creation
              accessible to everyone, regardless of budget or technical expertise.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-cyan-400">Why Aurevion?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Powered by state-of-the-art AI models</li>
              <li>Beautiful, intuitive user interface</li>
              <li>Lightning-fast results</li>
              <li>Production-ready quality</li>
              <li>Affordable pricing for all stages</li>
            </ul>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
