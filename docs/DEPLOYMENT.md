# Deployment Guide

## Prerequisites

- Docker & Docker Compose
- PostgreSQL 16+
- Redis 7+
- Node.js 18+
- Nginx

## Production Deployment

### 1. Environment Setup

Create a `.env.production` file with production values:

```bash
NODE_ENV=production
DB_HOST=your-db-host
DB_PASSWORD=your-secure-password
JWT_SECRET=your-production-jwt-secret
SENTRY_DSN=your-sentry-dsn
```

### 2. Docker Build

```bash
docker-compose -f docker-compose.prod.yml build
```

### 3. Database Migrations

```bash
docker-compose exec backend yarn db:migrate:deploy
```

### 4. Start Services

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 5. Nginx Configuration

See `nginx/nginx.conf` for production Nginx setup.

## Scaling

### Horizontal Scaling

- Run multiple backend instances behind load balancer
- Use Redis for session storage
- Database replication for read scaling

### Monitoring

- Enable Sentry for error tracking
- Set up OpenTelemetry for observability
- Monitor Docker container metrics

## Backup & Recovery

```bash
# Backup database
docker-compose exec postgres pg_dump -U postgres smart_qr_dev > backup.sql

# Restore database
cat backup.sql | docker-compose exec -T postgres psql -U postgres smart_qr_dev
```
