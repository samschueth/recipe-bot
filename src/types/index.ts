/**
 * Core type definitions for the Claude IDE Demo application
 * 
 * This file demonstrates Claude's ability to create comprehensive type definitions
 * with proper documentation and organization.
 */

// User-related types
export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'developer' | 'admin' | 'viewer'
  preferences: UserPreferences
  lastActive: string
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: string
  notifications: NotificationSettings
  codeStyle: CodeStylePreferences
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  desktop: boolean
  frequency: 'immediate' | 'hourly' | 'daily'
}

export interface CodeStylePreferences {
  indentSize: 2 | 4
  useTabs: boolean
  lineLength: number
  trailingComma: 'none' | 'es5' | 'all'
}

// Application state types
export interface AppState {
  sidebarOpen: boolean
  currentTheme: 'light' | 'dark'
  notifications: Notification[]
  loadingStates: Record<string, boolean>
  errors: AppError[]
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: string
  read: boolean
}

export interface AppError {
  id: string
  type: 'validation' | 'network' | 'runtime' | 'permission'
  message: string
  details?: Record<string, any>
  timestamp: string
  resolved: boolean
}

// Code analysis types
export interface CodeAnalysisResult {
  id: string
  filePath: string
  issues: CodeIssue[]
  metrics: CodeMetrics
  suggestions: CodeSuggestion[]
  timestamp: string
}

export interface CodeIssue {
  id: string
  type: 'error' | 'warning' | 'info'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  line: number
  column: number
  rule?: string
  fix?: CodeFix
}

export interface CodeFix {
  description: string
  changes: CodeChange[]
  confidence: number
}

export interface CodeChange {
  type: 'insert' | 'delete' | 'replace'
  line: number
  column: number
  oldText?: string
  newText: string
}

export interface CodeMetrics {
  complexity: number
  maintainability: number
  testCoverage: number
  duplication: number
  securityScore: number
}

export interface CodeSuggestion {
  id: string
  type: 'performance' | 'security' | 'readability' | 'best-practice'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  code?: string
}

// Refactoring types
export interface RefactoringOperation {
  id: string
  type: 'extract' | 'inline' | 'rename' | 'move' | 'split' | 'merge'
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  description: string
  changes: RefactoringChange[]
  beforeCode: string
  afterCode: string
  validation: RefactoringValidation
}

export interface RefactoringChange {
  filePath: string
  operations: CodeChange[]
  conflicts?: RefactoringConflict[]
}

export interface RefactoringConflict {
  type: 'naming' | 'dependency' | 'semantic'
  description: string
  resolution?: string
}

export interface RefactoringValidation {
  syntaxValid: boolean
  testsPass: boolean
  typeCheckPass: boolean
  performanceImpact: 'none' | 'low' | 'medium' | 'high'
  breakingChanges: boolean
}

// Debugging types
export interface DebugSession {
  id: string
  status: 'active' | 'paused' | 'stopped'
  breakpoints: Breakpoint[]
  callStack: CallStackFrame[]
  variables: DebugVariable[]
  console: DebugMessage[]
}

export interface Breakpoint {
  id: string
  filePath: string
  line: number
  column?: number
  condition?: string
  enabled: boolean
  hitCount: number
}

export interface CallStackFrame {
  functionName: string
  filePath: string
  line: number
  column: number
  arguments: DebugVariable[]
  locals: DebugVariable[]
}

export interface DebugVariable {
  name: string
  value: any
  type: string
  scope: 'global' | 'local' | 'parameter'
  expanded?: boolean
  children?: DebugVariable[]
}

export interface DebugMessage {
  id: string
  type: 'log' | 'error' | 'warn' | 'info'
  message: string
  timestamp: string
  level: number
}

// Testing types
export interface TestSuite {
  id: string
  name: string
  description: string
  tests: TestCase[]
  coverage: TestCoverage
  performance: TestPerformance
}

export interface TestCase {
  id: string
  name: string
  description: string
  status: 'passed' | 'failed' | 'skipped' | 'running'
  duration: number
  error?: TestError
  coverage: LineCoverage[]
}

export interface TestError {
  message: string
  stack?: string
  expected?: any
  actual?: any
}

export interface LineCoverage {
  line: number
  covered: boolean
  branches?: BranchCoverage[]
}

export interface BranchCoverage {
  branch: number
  covered: boolean
}

export interface TestCoverage {
  statements: number
  branches: number
  functions: number
  lines: number
  uncoveredLines: number[]
}

export interface TestPerformance {
  averageDuration: number
  slowestTest: string
  fastestTest: string
  memoryUsage: number
  cpuUsage: number
}

// API response types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
  timestamp: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationInfo
  total: number
}

export interface PaginationInfo {
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Event types
export interface AppEvent {
  type: string
  payload: any
  timestamp: string
  userId?: string
}

// Configuration types
export interface AppConfig {
  api: ApiConfig
  features: FeatureFlags
  security: SecurityConfig
}

export interface ApiConfig {
  baseUrl: string
  timeout: number
  retries: number
  headers: Record<string, string>
}

export interface FeatureFlags {
  codeAnalysis: boolean
  refactoring: boolean
  debugging: boolean
  testing: boolean
  aiSuggestions: boolean
}

export interface SecurityConfig {
  enableCSP: boolean
  enableHSTS: boolean
  enableXSSProtection: boolean
  allowedOrigins: string[]
} 