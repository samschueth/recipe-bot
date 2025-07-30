import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { AppState, Notification, AppError, UserProfile } from '@/types'

/**
 * Application store using Zustand with TypeScript
 * 
 * This store demonstrates Claude's ability to create clean, type-safe state management
 * with proper separation of concerns and middleware integration.
 */

interface AppStore extends AppState {
  // Actions
  toggleSidebar: (open?: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  markNotificationRead: (id: string) => void
  setLoadingState: (key: string, loading: boolean) => void
  addError: (error: Omit<AppError, 'id' | 'timestamp'>) => void
  resolveError: (id: string) => void
  clearErrors: () => void
  setUserProfile: (profile: UserProfile) => void
  reset: () => void
}

// Initial state
const initialState: AppState = {
  sidebarOpen: false,
  currentTheme: 'light',
  notifications: [],
  loadingStates: {},
  errors: [],
}

// Create the store with middleware
export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Toggle sidebar with optional parameter
        toggleSidebar: (open?: boolean) => {
          set((state) => ({
            sidebarOpen: open !== undefined ? open : !state.sidebarOpen,
          }))
        },

        // Set theme and persist to localStorage
        setTheme: (theme) => {
          set({ currentTheme: theme })
          // Apply theme to document
          document.documentElement.classList.toggle('dark', theme === 'dark')
        },

        // Add notification with auto-generated ID and timestamp
        addNotification: (notification) => {
          const newNotification: Notification = {
            ...notification,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
          }
          set((state) => ({
            notifications: [...state.notifications, newNotification],
          }))
        },

        // Remove notification by ID
        removeNotification: (id) => {
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }))
        },

        // Mark notification as read
        markNotificationRead: (id) => {
          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, read: true } : n
            ),
          }))
        },

        // Set loading state for specific operations
        setLoadingState: (key, loading) => {
          set((state) => ({
            loadingStates: {
              ...state.loadingStates,
              [key]: loading,
            },
          }))
        },

        // Add error with auto-generated ID and timestamp
        addError: (error) => {
          const newError: AppError = {
            ...error,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
          }
          set((state) => ({
            errors: [...state.errors, newError],
          }))
        },

        // Mark error as resolved
        resolveError: (id) => {
          set((state) => ({
            errors: state.errors.map((e) =>
              e.id === id ? { ...e, resolved: true } : e
            ),
          }))
        },

        // Clear all errors
        clearErrors: () => {
          set({ errors: [] })
        },

        // Set user profile (placeholder for future implementation)
        setUserProfile: (profile) => {
          // This would typically update user-related state
          console.log('User profile updated:', profile)
        },

        // Reset store to initial state
        reset: () => {
          set(initialState)
        },
      }),
      {
        name: 'claude-ide-store',
        partialize: (state) => ({
          currentTheme: state.currentTheme,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    ),
    {
      name: 'claude-ide-store',
    }
  )
)

// Selector hooks for better performance
export const useSidebarState = () => useAppStore((state) => state.sidebarOpen)
export const useTheme = () => useAppStore((state) => state.currentTheme)
export const useNotifications = () => useAppStore((state) => state.notifications)
export const useErrors = () => useAppStore((state) => state.errors)
export const useLoadingState = (key: string) =>
  useAppStore((state) => state.loadingStates[key] || false)

// Utility functions for common operations
export const appStoreUtils = {
  // Check if any loading state is active
  isAnyLoading: () => {
    const state = useAppStore.getState()
    return Object.values(state.loadingStates).some(Boolean)
  },

  // Get unread notifications count
  getUnreadCount: () => {
    const state = useAppStore.getState()
    return state.notifications.filter((n) => !n.read).length
  },

  // Get unresolved errors count
  getUnresolvedErrorCount: () => {
    const state = useAppStore.getState()
    return state.errors.filter((e) => !e.resolved).length
  },

  // Batch operations for better performance
  batchUpdate: (updates: Partial<AppState>) => {
    useAppStore.setState(updates)
  },
} 