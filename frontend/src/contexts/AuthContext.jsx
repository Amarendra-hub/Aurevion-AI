import { createContext, useState, useContext, useCallback, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('authUser')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    
    setLoading(false)
  }, [])

  const signup = useCallback(async (email, username, password, fullName) => {
    setError(null)
    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
          full_name: fullName,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Signup failed')
      }

      const data = await response.json()
      localStorage.setItem('authToken', data.access_token)
      localStorage.setItem('authUser', JSON.stringify(data.user))
      setToken(data.access_token)
      setUser(data.user)
      
      return data.user
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setError(null)
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Login failed')
      }

      const data = await response.json()
      localStorage.setItem('authToken', data.access_token)
      localStorage.setItem('authUser', JSON.stringify(data.user))
      setToken(data.access_token)
      setUser(data.user)
      
      return data.user
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    setToken(null)
    setUser(null)
    setError(null)
  }, [])

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        loading, 
        error,
        signup, 
        login, 
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
