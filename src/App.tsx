import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useQuery } from 'react-query'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import CodeAnalysis from '@/components/CodeAnalysis'
import RefactoringDemo from '@/components/RefactoringDemo'
import DebuggingDemo from '@/components/DebuggingDemo'
import TestingDemo from '@/components/TestingDemo'
import { useAppStore } from '@/store/appStore'
import { fetchUserProfile } from '@/api/userApi'

/**
 * Main application component that demonstrates Claude's IDE capabilities
 * 
 * Features demonstrated:
 * - Intelligent routing and layout management
 * - State management with Zustand
 * - React Query for data fetching
 * - Error boundaries and loading states
 * - TypeScript strict mode compliance
 */
const App: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppStore()

  // Fetch user profile data with React Query
  const { data: userProfile, isLoading, error } = useQuery(
    'userProfile',
    fetchUserProfile,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    }
  )

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Claude IDE Demo...</p>
        </div>
      </div>
    )
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Failed to load application
          </h1>
          <p className="text-gray-600 mb-4">
            Please check your connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <Header 
        userProfile={userProfile}
        onMenuClick={toggleSidebar}
      />

      <div className="flex">
        {/* Sidebar navigation */}
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => toggleSidebar(false)}
        />

        {/* Main content area */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}>
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/code-analysis" element={<CodeAnalysis />} />
              <Route path="/refactoring" element={<RefactoringDemo />} />
              <Route path="/debugging" element={<DebuggingDemo />} />
              <Route path="/testing" element={<TestingDemo />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App 