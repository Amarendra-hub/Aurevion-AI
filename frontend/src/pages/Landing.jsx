import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Zap, Palette, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import CTA from '../components/CTA'

export default function Landing() {
  return (
    <main className="pt-16">
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </main>
  )
}
