import axios from 'axios'

// Determine API base URL based on environment
const getApiBaseUrl = () => {
  // Production: Use environment variable
  if (import.meta.env.PROD) {
    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl || apiUrl === 'https://your-backend-url.com/api') {
      console.error(
        'CRITICAL: VITE_API_URL environment variable is not properly configured. ' +
        'Please set VITE_API_URL in your Vercel environment variables. ' +
        'Example: https://your-backend-url.com/api'
      )
      // Return a proper error URL pattern that will fail with useful message
      return '/api' // Will fail but at least try local fallback
    }
    return apiUrl
  }
  // Development: Use Vite proxy
  return import.meta.env.VITE_API_URL || '/api'
}

const API_BASE_URL = getApiBaseUrl()

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 second timeout for AI endpoints
})

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, response.status)
    return response
  },
  (error) => {
    console.error('API Error Details:', {
      url: error.config?.url,
      method: error.config?.method,
      timeout: error.config?.timeout,
      message: error.message,
      code: error.code,
      isNetworkError: !!error.request,
      isServerError: !!error.response,
      responseStatus: error.response?.status,
      responseData: error.response?.data
    })

    if (error.response) {
      // Server responded with error status
      console.error('Response status:', error.response.status)
      console.error('Response data:', error.response.data)
      const message = error.response.data?.detail || error.response.data?.message || error.message
      throw new Error(message)
    } else if (error.request) {
      // Network error
      console.error('Network error - no response received')
      throw new Error('Network error - please check your connection and try again')
    } else {
      // Other error
      console.error('Request setup error:', error.message)
      throw new Error(error.message || 'An unexpected error occurred')
    }
  }
)

// Brand Name Generation
export const generateBrandNames = async ({ description, keywords, tone }) => {
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
export const generateContent = async ({ contentType, brandName, context }) => {
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
