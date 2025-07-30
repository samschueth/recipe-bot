import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/appStore'
import type { UserProfile } from '@/types'

/**
 * Header component demonstrating Claude's ability to create clean, accessible UI components
 * with proper TypeScript integration and modern React patterns.
 */

interface HeaderProps {
  userProfile?: UserProfile
  onMenuClick: () => void
}

const Header: React.FC<HeaderProps> = ({ userProfile, onMenuClick }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentTheme, setTheme, addNotification } = useAppStore()

  /**
   * Handle theme toggle with smooth transition
   */
  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    
    addNotification({
      type: 'info',
      title: 'Theme Updated',
      message: `Switched to ${newTheme} theme`,
    })
  }

  /**
   * Handle user profile actions
   */
  const handleProfileAction = (action: 'view' | 'edit' | 'logout') => {
    switch (action) {
      case 'view':
        navigate('/profile')
        break
      case 'edit':
        navigate('/profile/edit')
        break
      case 'logout':
        // Handle logout logic
        addNotification({
          type: 'info',
          title: 'Logout',
          message: 'You have been logged out successfully',
        })
        break
    }
  }

  /**
   * Get current page title for breadcrumb
   */
  const getPageTitle = (): string => {
    const pathMap: Record<string, string> = {
      '/': 'Dashboard',
      '/code-analysis': 'Code Analysis',
      '/refactoring': 'Refactoring',
      '/debugging': 'Debugging',
      '/testing': 'Testing',
    }
    return pathMap[location.pathname] || 'Unknown Page'
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button and title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-gray-900">
              Claude IDE Demo
            </h1>
            <p className="text-sm text-gray-500">{getPageTitle()}</p>
          </div>
        </div>

        {/* Center - Search bar (hidden on mobile) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search files, functions, or documentation..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition-colors duration-200"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Right side - Actions and user menu */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
          >
            {currentTheme === 'light' ? (
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="View notifications"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5zM4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User profile dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="User menu"
            >
              {userProfile?.avatar ? (
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {userProfile?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {userProfile?.name || 'User'}
              </span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <button
                onClick={() => handleProfileAction('view')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                View Profile
              </button>
              <button
                onClick={() => handleProfileAction('edit')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit Profile
              </button>
              <hr className="my-1" />
              <button
                onClick={() => handleProfileAction('logout')}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 