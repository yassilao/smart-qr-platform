# Database Schema Documentation

## Core Entities

### User
Stores user account information with authentication and role management.

**Key Fields:**
- `id`: Unique identifier
- `email`: User email (unique)
- `password`: Hashed password
- `role`: SUPER_ADMIN, ORGANIZATION_ADMIN, INSTRUCTOR, MODERATOR, STUDENT, GUEST
- `organizationId`: Reference to organization
- `twoFactorEnabled`: 2FA status
- `lastLoginAt`: Last login timestamp

### Organization
Represents organization/institution/company.

**Key Fields:**
- `id`: Unique identifier
- `slug`: URL-friendly identifier (unique)
- `name`: Organization name
- `plan`: BillingPlan (FREE, STARTER, PROFESSIONAL, ENTERPRISE)
- `maxUsers`: Maximum users allowed
- `maxStorage`: Maximum storage limit

### Course Hierarchy
```
Course
├── Module
│   ├── Chapter
│   │   └── Lesson
│   │       └── Activity
│   │           ├── Quiz
│   │           ├── Survey
│   │           └── Assignment
```

### Quiz System
- `Quiz`: Quiz definition
- `Question`: Individual questions
- `QuestionOption`: Answer options
- `QuizAttempt`: Student attempt record
- `AttemptAnswer`: Individual answers submitted

### QR Code System
- `QrCode`: QR code record
- `QrScan`: Individual scan records with metadata

### Assessment & Certificates
- `Certificate`: Certificate records with verification
- `Attendance`: Attendance tracking
- `Survey`: Survey forms
- `SurveyResponse`: Survey responses

### Analytics & Logging
- `CourseAnalytics`: Course engagement metrics
- `QrAnalytics`: QR scan analytics
- `AuditLog`: System action logging
- `Notification`: User notifications

## Indexes

Optimized for:
- User lookup by email and organization
- Course queries by organization and instructor
- Quiz attempt queries by user and quiz
- QR scan aggregations
- Full-text search on courses

## Relationships

### Tenant Isolation
- `organizationId` filters enforce organization boundaries
- Users can only access resources within their organization
- Role-based access control at application layer

### Cascading Deletes
- Deleting organization cascades to all related data
- Deleting course cascades to modules, chapters, lessons
- Deleting quiz cascades to questions and attempts
