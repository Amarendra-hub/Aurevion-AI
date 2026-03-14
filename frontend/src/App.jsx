import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import BrandNameGenerator from './pages/BrandNameGenerator'
import LogoGenerator from './pages/LogoGenerator'
import ContentGenerator from './pages/ContentGenerator'
import SentimentAnalysis from './pages/SentimentAnalysis'
import Settings from './pages/Settings'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-background text-slate-100">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/brand-name" element={<ProtectedRoute><BrandNameGenerator /></ProtectedRoute>} />
            <Route path="/dashboard/logo" element={<ProtectedRoute><LogoGenerator /></ProtectedRoute>} />
            <Route path="/dashboard/content" element={<ProtectedRoute><ContentGenerator /></ProtectedRoute>} />
            <Route path="/dashboard/sentiment" element={<ProtectedRoute><SentimentAnalysis /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
