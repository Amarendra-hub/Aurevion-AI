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
const N8N_CHAT_URL = import.meta.env.VITE_N8N_CHAT_URL

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
export const generateLogo = async ({ brandName, style, colorPreference }) => {
  const response = await apiClient.post('/generate/logo', {
    brand_name: brandName,
    style,
    color_preference: colorPreference,
  })
  return response.data
}

const extractAgentReply = (responseData) => {
  let value = Array.isArray(responseData) ? responseData[0] : responseData

  for (let depth = 0; depth < 4; depth += 1) {
    if (typeof value === 'string' && value.trim()) return value.trim()
    if (!value || typeof value !== 'object') break

    const reply = value.reply ?? value.output ?? value.text ?? value.response ?? value.content
    if (reply !== undefined) {
      value = Array.isArray(reply) ? reply[0] : reply
      continue
    }
    if (value.data !== undefined) {
      value = value.data
      continue
    }
    break
  }

  throw new Error('n8n returned an empty or unsupported response')
}

const postToN8nAgent = async ({ message, sessionId, extraPayload = {} }) => {
  if (!N8N_CHAT_URL) {
    throw new Error('Set VITE_N8N_CHAT_URL in frontend/.env.local and restart the frontend.')
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 120000)
  let response

  try {
    response = await fetch(N8N_CHAT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'sendMessage',
        chatInput: message,
        sessionId,
        metadata: {},
        ...extraPayload,
      }),
      signal: controller.signal,
    })
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('The n8n agent took too long to respond.')
    }
    throw new Error('Could not reach n8n. Check the test listener, URL, and CORS settings.')
  } finally {
    clearTimeout(timeoutId)
  }

  const responseText = await response.text()
  let responseData = responseText
  try {
    responseData = responseText ? JSON.parse(responseText) : null
  } catch {
    // Some Chat Trigger workflows return plain text.
  }

  if (!response.ok) {
    const detail = responseData?.message || responseData?.error || responseData?.detail
    throw new Error(detail || `n8n returned HTTP ${response.status}`)
  }

  return extractAgentReply(responseData)
}

const createSessionId = () =>
  globalThis.crypto?.randomUUID?.() || `session-${Date.now()}-${Math.random().toString(36).slice(2)}`

// Generate content directly through the n8n Chat Trigger when configured.
export const generateContent = async ({ contentType, brandName, context }) => {
  if (!N8N_CHAT_URL) {
    const response = await apiClient.post('/generate/content', {
      content_type: contentType,
      brand_name: brandName,
      context,
    })
    return response.data
  }

  const tasks = {
    product_description: 'Create a compelling 2-3 sentence product description',
    tagline: 'Create a catchy and memorable brand tagline (5-10 words)',
    social_media: 'Create an engaging social media caption (50-100 characters)',
    email_subject: 'Create 5 compelling email subject lines',
    ad_copy: 'Create an engaging ad copy (2-3 sentences)',
  }
  const task = tasks[contentType] || 'Generate marketing content'
  const reply = await postToN8nAgent({
    message: `${task} for ${brandName}. Context: ${context || 'General business context'}`,
    sessionId: createSessionId(),
    extraPayload: { content_type: contentType, brand_name: brandName, context },
  })
  return { content: [{ text: reply }] }
}

// Chat directly with the configured n8n agent from the browser.
export const sendAgentMessage = async ({ message, sessionId }) => ({
  reply: await postToN8nAgent({ message, sessionId }),
  session_id: sessionId,
})

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
