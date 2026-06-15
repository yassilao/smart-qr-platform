# Smart QR Learning & Assessment Platform

A production-grade, enterprise-scale SaaS platform for educational institutions, training centers, and corporate organizations.

## 🎯 Features

### Core Features
- **Multi-tenant Architecture**: Complete tenant isolation with organization-level branding
- **Course Management**: Hierarchical course structure (Course → Module → Chapter → Lesson → Activity)
- **QR Code Engine**: Dynamic QR codes with analytics for courses, quizzes, events, and certificates
- **Quiz & Assessment System**: Multiple question types with auto-grading and leaderboards
- **Survey Builder**: Drag-and-drop survey builder with comprehensive analytics
- **Attendance System**: QR-based attendance with GPS verification and reporting
- **Certificate Engine**: Automatic certificate generation with QR verification
- **Analytics Dashboard**: Real-time engagement tracking and comprehensive reporting

### Authentication & Security
- Email/Password authentication
- OAuth integration (Google, Microsoft, Facebook)
- Two-factor authentication (2FA)
- Session management with device tracking
- Refresh token rotation
- RBAC with granular permissions
- OWASP Top 10 compliance

### Content Management
- Support for multiple file types (PDF, Video, Audio, Images, PowerPoint, Word, Excel)
- Rich text editor with HTML embedding
- File versioning and access control
- Virus scanning for uploads

### Multi-language Support
- English, French, Arabic
- RTL support for Arabic language

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- Next.js 16+ with TypeScript
- Tailwind CSS for styling
- Shadcn/UI component library
- React Query for data fetching
- Zustand for state management
- React Hook Form for form management
- Zod for schema validation
- Framer Motion for animations

**Backend:**
- Node.js with Express.js
- TypeScript
- Prisma ORM
- PostgreSQL database
- Redis for caching
- BullMQ for job queues
- NextAuth for authentication

**Infrastructure:**
- Docker & Docker Compose
- Nginx for reverse proxy
- AWS S3 compatible storage (MinIO)
- PostgreSQL Full Text Search

**Monitoring & Analytics:**
- Sentry for error tracking
- OpenTelemetry for observability
- Custom analytics engine

## 📦 Project Structure

```
smart-qr-platform/
├── apps/
│   ├── backend/          # Express.js backend
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── routes/
│   │   │   ├── middleware/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   └── Dockerfile
│   └── web/              # Next.js frontend
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   ├── hooks/
│       │   ├── lib/
│       │   ├── pages/
│       │   └── styles/
│       └── Dockerfile
├── packages/
│   ├── db/               # Prisma schemas & migrations
│   │   ├── prisma/
│   │   ├── src/
│   │   └── package.json
│   └── shared/           # Shared utilities & types
│       ├── src/
│       └── package.json
├── nginx/                # Nginx configuration
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yassilao/smart-qr-platform.git
cd smart-qr-platform
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development environment:
```bash
yarn docker:up
```

5. Run database migrations:
```bash
yarn db:migrate
```

6. Seed the database (optional):
```bash
yarn db:seed
```

7. Start development servers:
```bash
yarn dev
```

## 🎛️ Admin Roles

- **Super Admin**: Platform administrator with full access
- **Organization Admin**: Organization-level administrator
- **Instructor**: Course creation and content management
- **Moderator**: Course moderation and student management
- **Student**: Course participation and assessment
- **Guest**: Limited read-only access

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [Database Schema](./docs/database.md)
- [Authentication Flow](./docs/authentication.md)
- [Deployment Guide](./docs/deployment.md)
- [Security Best Practices](./docs/security.md)

## 🔒 Security

- OWASP Top 10 compliant
- JWT-based authentication
- Refresh token rotation
- CSRF protection
- XSS protection
- SQL injection prevention
- Rate limiting
- Helmet for secure headers
- Audit logging

## 📊 Monitoring

- Real-time error tracking with Sentry
- OpenTelemetry instrumentation
- Custom analytics dashboard
- Performance monitoring

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details.

## 📞 Support

For support, email support@smartqr.com or open an issue in the repository.
