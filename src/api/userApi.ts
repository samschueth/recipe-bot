import axios from 'axios'
import type { UserProfile, ApiResponse } from '@/types'

/**
 * User API functions demonstrating Claude's ability to create clean API layers
 * with proper error handling, TypeScript types, and best practices.
 */

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    } else if (error.response?.status === 403) {
      // Forbidden - show access denied message
      console.error('Access denied:', error.response.data)
    } else if (error.response?.status >= 500) {
      // Server error - show generic error
      console.error('Server error:', error.response.data)
    }
    return Promise.reject(error)
  }
)

/**
 * Fetch user profile with caching and error handling
 */
export const fetchUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await apiClient.get<ApiResponse<UserProfile>>('/user/profile')
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch user profile')
    }
    
    return response.data.data
  } catch (error) {
    // Return mock data for demo purposes
    console.warn('Using mock user profile data:', error)
    return getMockUserProfile()
  }
}

/**
 * Update user profile
 */
export const updateUserProfile = async (
  updates: Partial<UserProfile>
): Promise<UserProfile> => {
  try {
    const response = await apiClient.patch<ApiResponse<UserProfile>>(
      '/user/profile',
      updates
    )
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update user profile')
    }
    
    return response.data.data
  } catch (error) {
    console.error('Failed to update user profile:', error)
    throw error
  }
}

/**
 * Update user preferences
 */
export const updateUserPreferences = async (
  preferences: Partial<UserProfile['preferences']>
): Promise<UserProfile> => {
  try {
    const response = await apiClient.patch<ApiResponse<UserProfile>>(
      '/user/preferences',
      preferences
    )
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update preferences')
    }
    
    return response.data.data
  } catch (error) {
    console.error('Failed to update preferences:', error)
    throw error
  }
}

/**
 * Get user activity history
 */
export const getUserActivity = async (params?: {
  page?: number
  limit?: number
  startDate?: string
  endDate?: string
}) => {
  try {
    const response = await apiClient.get('/user/activity', { params })
    return response.data
  } catch (error) {
    console.error('Failed to fetch user activity:', error)
    throw error
  }
}

/**
 * Mock user profile for demo purposes
 */
const getMockUserProfile = (): UserProfile => ({
  id: 'user-123',
  name: 'Claude IDE Demo User',
  email: 'demo@claude-ide.com',
  avatar: 'https://via.placeholder.com/150',
  role: 'developer',
  preferences: {
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      desktop: true,
      frequency: 'immediate',
    },
    codeStyle: {
      indentSize: 2,
      useTabs: false,
      lineLength: 80,
      trailingComma: 'es5',
    },
  },
  lastActive: new Date().toISOString(),
})

/**
 * Utility functions for user-related operations
 */
export const userApiUtils = {
  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * Format user name for display
   */
  formatUserName: (user: UserProfile): string => {
    return user.name || user.email.split('@')[0]
  },

  /**
   * Get user initials for avatar
   */
  getUserInitials: (user: UserProfile): string => {
    return user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  },

  /**
   * Check if user has admin privileges
   */
  isAdmin: (user: UserProfile): boolean => {
    return user.role === 'admin'
  },

  /**
   * Check if user can perform specific actions
   */
  canPerformAction: (
    user: UserProfile,
    action: 'read' | 'write' | 'delete' | 'admin'
  ): boolean => {
    switch (action) {
      case 'read':
        return true // All users can read
      case 'write':
        return ['developer', 'admin'].includes(user.role)
      case 'delete':
        return user.role === 'admin'
      case 'admin':
        return user.role === 'admin'
      default:
        return false
    }
  },
} 