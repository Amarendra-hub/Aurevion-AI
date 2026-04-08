import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from 'react-query'
import { Palette, Download } from 'lucide-react'
import { generateLogo } from '../services/api'

export default function LogoGenerator() {
  const [brandName, setBrandName] = useState('')
  const [style, setStyle] = useState('modern')
  const [colorPreference, setColorPreference] = useState('multicolor')
  const [results, setResults] = useState([])

  const mutation = useMutation(generateLogo, {
    onSuccess: (data) => {
      setResults(data.logos || [])
    },
  })

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!brandName.trim()) {
      return
    }
    mutation.mutate({ brandName, style, colorPreference })
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
            <Palette className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold">Logo Generator</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Create stunning AI-generated logos using Stable Diffusion
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
                  Brand Name *
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="input-field w-full"
                  placeholder="Enter your brand name..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Logo Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="modern">Modern</option>
                  <option value="minimal">Minimal</option>
                  <option value="gradient">Gradient</option>
                  <option value="3d">3D</option>
                  <option value="abstract">Abstract</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Color Preference
                </label>
                <select
                  value={colorPreference}
                  onChange={(e) => setColorPreference(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="multicolor">Multicolor</option>
                  <option value="monochrome">Monochrome</option>
                  <option value="vibrant">Vibrant</option>
                  <option value="dark">Dark</option>
                  <option value="pastel">Pastel</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={mutation.isLoading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isLoading ? 'Generating...' : 'Generate Logo'}
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
              <div className="glass p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-purple-400">
                  Generated Logos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.map((logo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="glass p-4 rounded-lg border border-slate-700 hover:border-purple-500 transition-all"
                    >
                      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 mb-4 flex items-center justify-center h-48">
                        <div className="text-center">
                          <Palette className="w-16 h-16 text-purple-400 mx-auto mb-3" />
                          <p className="text-slate-400 text-sm">Logo Preview</p>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm mb-3 min-h-12">
                        {logo.description}
                      </p>
                      {logo.note && (
                        <p className="text-xs text-slate-500 mb-3 italic">
                          {logo.note}
                        </p>
                      )}
                      <button className="btn-secondary w-full flex items-center justify-center gap-2">
                        <Download size={18} />
                        Download
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : mutation.isLoading ? (
              <div className="glass p-12 rounded-xl text-center">
                <div className="inline-block">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-600 border-t-purple-400 animate-spin" />
                </div>
                <p className="mt-4 text-slate-400">Generating stunning logos...</p>
              </div>
            ) : (
              <div className="glass p-12 rounded-xl text-center">
                <p className="text-slate-400">
                  Fill in the form and click "Generate Logo" to see results
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
