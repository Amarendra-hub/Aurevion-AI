import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import BrandNameGenerator from './pages/BrandNameGenerator'
import LogoGenerator from './pages/LogoGenerator'
import ContentGenerator from './pages/ContentGenerator'
import SentimentAnalysis from './pages/SentimentAnalysis'
import Settings from './pages/Settings'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-slate-100">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/brand-name" element={<BrandNameGenerator />} />
          <Route path="/dashboard/logo" element={<LogoGenerator />} />
          <Route path="/dashboard/content" element={<ContentGenerator />} />
          <Route path="/dashboard/sentiment" element={<SentimentAnalysis />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
