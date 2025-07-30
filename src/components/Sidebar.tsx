import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/appStore'

/**
 * Sidebar navigation component demonstrating Claude's ability to create
 * accessible navigation with proper routing and state management.
 */

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface NavItem {
  path: string
  label: string
  icon: React.ReactNode
  description: string
  badge?: string
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { addNotification } = useAppStore()

  // Navigation items with icons and descriptions
  const navItems: NavItem[] = [
    {
      path: '/',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      ),
      description: 'Overview and quick actions',
    },
    {
      path: '/code-analysis',
      label: 'Code Analysis',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Analyze code quality and performance',
      badge: 'AI',
    },
    {
      path: '/refactoring',
      label: 'Refactoring',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      description: 'Smart code restructuring',
      badge: 'Smart',
    },
    {
      path: '/debugging',
      label: 'Debugging',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      description: 'Advanced debugging tools',
    },
    {
      path: '/testing',
      label: 'Testing',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: 'Test generation and analysis',
      badge: 'Auto',
    },
  ]

  /**
   * Handle navigation with analytics tracking
   */
  const handleNavigation = (path: string, label: string) => {
    // Track navigation for analytics
    console.log(`Navigated to: ${path} (${label})`)
    
    // Add notification for demo purposes
    addNotification({
      type: 'info',
      title: 'Navigation',
      message: `Navigated to ${label}`,
    })
  }

  /**
   * Get active class based on current location
   */
  const getActiveClass = (path: string): string => {
    const isActive = location.pathname === path
    return `sidebar-link ${isActive ? 'active' : ''}`
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 
                   transform transition-transform duration-300 ease-in-out z-50
                   ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Claude IDE</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close sidebar"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={getActiveClass(item.path)}
                onClick={() => handleNavigation(item.path, item.label)}
                title={item.description}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600">{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  </div>
                </div>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              <p>Claude IDE Demo</p>
              <p className="mt-1">Powered by Claude AI</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar 