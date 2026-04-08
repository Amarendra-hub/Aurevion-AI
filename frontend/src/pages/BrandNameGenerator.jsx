import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from 'react-query'
import { Sparkles, Copy, Download } from 'lucide-react'
import { generateBrandNames } from '../services/api'

export default function BrandNameGenerator() {
  const [description, setDescription] = useState('')
  const [keywords, setKeywords] = useState('')
  const [tone, setTone] = useState('professional')
  const [results, setResults] = useState([])
  const [copied, setCopied] = useState(null)

  const mutation = useMutation(generateBrandNames, {
    onSuccess: (data) => {
      setResults(data.names || [])
    },
  })

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!description.trim()) {
      return
    }
    mutation.mutate({ description, keywords, tone })
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
            <Sparkles className="w-8 h-8 text-indigo-400" />
            <h1 className="text-4xl font-bold">Brand Name Generator</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Generate creative and unique brand names for your business using AI
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
                  Business Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field w-full resize-none"
                  rows="4"
                  placeholder="Describe your business, product, or service..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="input-field w-full"
                  placeholder="e.g., tech, sustainable, modern (comma separated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Brand Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="professional">Professional</option>
                  <option value="playful">Playful</option>
                  <option value="minimal">Minimal</option>
                  <option value="bold">Bold</option>
                  <option value="elegant">Elegant</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={mutation.isLoading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isLoading ? 'Generating...' : 'Generate Names'}
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
                    Generated Brand Names
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((name, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="glass p-4 rounded-lg border border-slate-700 hover:border-cyan-500 transition-all group"
                      >
                        <p className="text-lg font-semibold text-white mb-3">
                          {name.name || name}
                        </p>
                        {name.description && (
                          <p className="text-sm text-slate-400 mb-4">
                            {name.description}
                          </p>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyToClipboard(name.name || name, index)}
                            className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded hover:bg-slate-700"
                          >
                            <Copy size={16} />
                            {copied === index ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : mutation.isLoading ? (
              <div className="glass p-12 rounded-xl text-center">
                <div className="inline-block">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-600 border-t-cyan-400 animate-spin" />
                </div>
                <p className="mt-4 text-slate-400">Generating creative brand names...</p>
              </div>
            ) : (
              <div className="glass p-12 rounded-xl text-center">
                <p className="text-slate-400">
                  Fill in the form and click "Generate Names" to see results
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
