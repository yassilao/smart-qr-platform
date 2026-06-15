# Smart QR Learning & Assessment Platform - API Documentation

## Base URL

```
http://localhost:3001/api
```

## Authentication

All API endpoints require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
```
POST /auth/register
Body: { email, password, firstName, lastName, organizationId? }
Response: { user, token, refreshToken }
```

#### Login
```
POST /auth/login
Body: { email, password }
Response: { user, token, refreshToken }
```

#### Refresh Token
```
POST /auth/refresh
Body: { refreshToken }
Response: { token }
```

#### Logout
```
POST /auth/logout
Response: { message }
```

### Courses

#### Get All Courses
```
GET /courses
Response: { courses: Course[] }
```

#### Create Course
```
POST /courses
Auth: INSTRUCTOR, ORGANIZATION_ADMIN
Body: { title, description?, category?, tags? }
Response: { course: Course }
```

#### Get Course
```
GET /courses/:id
Response: { course: Course }
```

#### Update Course
```
PUT /courses/:id
Auth: INSTRUCTOR, ORGANIZATION_ADMIN
Body: { title?, description?, status?, visibility? }
Response: { course: Course }
```

#### Enroll in Course
```
POST /courses/:id/enroll
Response: { enrollment: CourseEnrollment }
```

### Quizzes

#### Create Quiz
```
POST /quizzes
Auth: INSTRUCTOR, ORGANIZATION_ADMIN
Body: { title, description?, passingScore?, duration? }
Response: { quiz: Quiz }
```

#### Get Quiz
```
GET /quizzes/:id
Response: { quiz: Quiz }
```

#### Add Question
```
POST /quizzes/:id/questions
Auth: INSTRUCTOR, ORGANIZATION_ADMIN
Body: { type, question, options, correctAnswer, explanation? }
Response: { question: Question }
```

#### Submit Quiz
```
POST /quizzes/:id/submit
Body: { answers: [{ questionId, selectedOptionId }] }
Response: { attempt: QuizAttempt }
```

### QR Codes

#### Generate QR Code
```
POST /qr-codes/generate
Auth: INSTRUCTOR, ORGANIZATION_ADMIN
Body: { entityType, entityId, expiresAt?, password?, maxScans? }
Response: { qrCode: QRCode, qrImage: string }
```

#### Get QR Code
```
GET /qr-codes/:code
Response: { qrCode: QRCode, redirectTo: string }
```

### Attendance

#### Check In
```
POST /attendance/check-in
Body: { sessionId, latitude?, longitude? }
Response: { attendance: Attendance }
```

#### Check Out
```
POST /attendance/check-out/:attendanceId
Response: { attendance: Attendance }
```

#### Get Attendance Records
```
GET /attendance/session/:sessionId
Response: { records: Attendance[] }
```

### Certificates

#### Get User Certificates
```
GET /certificates/user/me
Response: { certificates: Certificate[] }
```

#### Get Certificate
```
GET /certificates/:id
Response: { certificate: Certificate }
```

#### Verify Certificate
```
GET /certificates/verify/:certificateId
Response: { verified: boolean, certificate: Certificate }
```

### Analytics

#### Get Course Analytics
```
GET /analytics/courses/:courseId
Response: { analytics: CourseAnalytics }
```

#### Get QR Analytics
```
GET /analytics/qr/:qrCodeId
Response: { totalScans, uniqueScans, scans }
```

### Notifications

#### Get Notifications
```
GET /notifications
Response: { notifications: Notification[] }
```

#### Mark as Read
```
PUT /notifications/:id/read
Response: { notification: Notification }
```

## Error Handling

All errors follow this format:

```json
{
  "status": "error",
  "code": "ERROR_CODE",
  "message": "Error description"
}
```

Common error codes:
- `VALIDATION_ERROR` (400)
- `AUTHENTICATION_ERROR` (401)
- `AUTHORIZATION_ERROR` (403)
- `NOT_FOUND` (404)
- `INTERNAL_ERROR` (500)
