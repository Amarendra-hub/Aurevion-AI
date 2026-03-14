import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Brand Name Generation
export const generateBrandNames = async (description, keywords, tone) => {
  const response = await apiClient.post('/generate/brand-names', {
    description,
    keywords,
    tone,
  })
  return response.data
}

// Logo Generation
export const generateLogo = async (brandName, style, colorPreference) => {
  const response = await apiClient.post('/generate/logo', {
    brand_name: brandName,
    style,
    color_preference: colorPreference,
  })
  return response.data
}

// Content Generation
export const generateContent = async (contentType, brandName, context) => {
  const response = await apiClient.post('/generate/content', {
    content_type: contentType,
    brand_name: brandName,
    context,
  })
  return response.data
}

// Sentiment Analysis
export const analyzeSentiment = async (text) => {
  const response = await apiClient.post('/analyze/sentiment', {
    text,
  })
  return response.data
}

// Get Dashboard Stats
export const getDashboardStats = async () => {
  const response = await apiClient.get('/dashboard/stats')
  return response.data
}

// Get Recent Activity
export const getRecentActivity = async () => {
  const response = await apiClient.get('/dashboard/activity')
  return response.data
}

// Authentication APIs
export const signup = async (email, username, password, fullName) => {
  const response = await apiClient.post('/auth/signup', {
    email,
    username,
    password,
    full_name: fullName,
  })
  return response.data
}

export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', {
    email,
    password,
  })
  return response.data
}

export const verifyToken = async (token) => {
  const response = await apiClient.post('/auth/verify-token', { token })
  return response.data
}

export const getCurrentUser = async (token) => {
  const response = await apiClient.get('/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  return response.data
}

export default apiClient
