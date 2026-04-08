import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from 'react-query'
import { MessageSquare, Copy } from 'lucide-react'
import { generateContent } from '../services/api'

export default function ContentGenerator() {
  const [contentType, setContentType] = useState('product_description')
  const [brandName, setBrandName] = useState('')
  const [context, setContext] = useState('')
  const [results, setResults] = useState([])
  const [copied, setCopied] = useState(null)

  const mutation = useMutation(generateContent, {
    onSuccess: (data) => {
      setResults(Array.isArray(data.content) ? data.content : [data.content])
    },
  })

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!brandName.trim()) {
      return
    }
    mutation.mutate({ contentType, brandName, context })
  }

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

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
            <MessageSquare className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold">Content Generator</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Generate compelling marketing content powered by Google Gemini
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleGenerate}
            className="glass p-6 rounded-xl lg:col-span-1 h-fit sticky top-24"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Content Type *
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="product_description">Product Description</option>
                  <option value="tagline">Tagline</option>
                  <option value="social_media">Social Media Caption</option>
                  <option value="email_subject">Email Subject</option>
                  <option value="ad_copy">Ad Copy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Brand Name *
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="input-field w-full"
                  placeholder="Your brand name..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Context
                </label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="input-field w-full resize-none"
                  rows="4"
                  placeholder="Describe your product, target audience, unique selling points..."
                />
              </div>

              <button
                type="submit"
                disabled={mutation.isLoading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isLoading ? 'Generating...' : 'Generate Content'}
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
            {results.length > 0 ? (
              <div className="space-y-4">
                <div className="glass p-6 rounded-xl">
                  <h2 className="text-2xl font-bold mb-6 text-cyan-400">
                    Generated Content
                  </h2>
                  {results.map((content, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="glass p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-all mb-4 last:mb-0"
                    >
                      <p className="text-white leading-relaxed mb-4 whitespace-pre-wrap">
                        {content.text || content}
                      </p>
                      <button
                        onClick={() => copyToClipboard(content.text || content, index)}
                        className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded hover:bg-slate-700"
                      >
                        <Copy size={16} />
                        {copied === index ? 'Copied!' : 'Copy'}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : mutation.isLoading ? (
              <div className="glass p-12 rounded-xl text-center">
                <div className="inline-block">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-600 border-t-cyan-400 animate-spin" />
                </div>
                <p className="mt-4 text-slate-400">Generating creative content...</p>
              </div>
            ) : (
              <div className="glass p-12 rounded-xl text-center">
                <p className="text-slate-400">
                  Fill in the form and click "Generate Content" to see results
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
