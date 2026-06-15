// API Response types
export interface ApiResponse<T> {
  status: 'success' | 'error'
  data?: T
  message?: string
  code?: string
}

// User types
export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  avatar?: string
  role: 'SUPER_ADMIN' | 'ORGANIZATION_ADMIN' | 'INSTRUCTOR' | 'MODERATOR' | 'STUDENT' | 'GUEST'
  organizationId?: string
  createdAt: Date
}

// Course types
export interface Course {
  id: string
  title: string
  slug: string
  description?: string
  thumbnail?: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  visibility: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED'
  category?: string
  tags: string[]
  organizationId: string
  instructorId: string
  createdAt: Date
  updatedAt: Date
}

// Quiz types
export interface Quiz {
  id: string
  title: string
  description?: string
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED'
  duration?: number
  passingScore: number
  organizationId: string
  createdAt: Date
}

export interface Question {
  id: string
  type: string
  question: string
  explanation?: string
  marks: number
  order: number
}

// Certificate types
export interface Certificate {
  id: string
  certificateId: string
  userId: string
  courseId: string
  issuedDate: Date
  expiryDate?: Date
}

// QR Code types
export interface QRCode {
  id: string
  code: string
  url: string
  entityType: string
  entityId: string
  expiresAt?: Date
  currentScans: number
  maxScans?: number
}

// Validation schemas
export const loginSchema = {
  email: 'string',
  password: 'string',
}

export const registerSchema = {
  email: 'string',
  password: 'string',
  firstName: 'string',
  lastName: 'string',
}
