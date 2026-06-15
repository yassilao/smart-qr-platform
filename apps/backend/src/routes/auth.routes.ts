import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { authLimiter } from '../middleware/rateLimiter';
import { authenticate } from '../middleware/auth';
import { validate } from '../utils/validation';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { hashPassword, comparePassword } from '../utils/hash';
import { sendEmail } from '../config/email';
import { prisma } from '../config/prisma';
import { AuthenticationError, ValidationError, NotFoundError } from '../middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  organizationId: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const refreshSchema = z.object({
  refreshToken: z.string(),
});

// Register
router.post('/register', authLimiter, async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, organizationId } = validate(
    registerSchema,
    req.body
  );

  // Check if user exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ValidationError('Email already registered');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      id: uuidv4(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      organizationId,
      role: 'STUDENT',
    },
  });

  // Generate tokens
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId || undefined,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId || undefined,
  });

  // Send verification email
  await sendEmail({
    to: email,
    subject: 'Welcome to Smart QR Platform',
    html: `<p>Welcome ${firstName}! Please verify your email to activate your account.</p>`,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
      refreshToken,
    },
  });
});

// Login
router.post('/login', authLimiter, async (req: Request, res: Response) => {
  const { email, password } = validate(loginSchema, req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AuthenticationError('Invalid credentials');
  }

  if (!user.password) {
    throw new AuthenticationError('Please login with OAuth provider');
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new AuthenticationError('Invalid credentials');
  }

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: {
      lastLoginAt: new Date(),
      lastLoginIp: req.ip,
    },
  });

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId || undefined,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId || undefined,
  });

  res.json({
    status: 'success',
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
      refreshToken,
    },
  });
});

// Refresh token
router.post('/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = validate(refreshSchema, req.body);

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    throw new AuthenticationError('Invalid refresh token');
  }

  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  if (!user) {
    throw new NotFoundError('User');
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId || undefined,
  });

  res.json({
    status: 'success',
    data: { token },
  });
});

// Logout
router.post('/logout', authenticate, async (req: Request, res: Response) => {
  // Invalidate session/token if using Redis
  res.json({ status: 'success', message: 'Logged out successfully' });
});

// Current user
router.get('/me', authenticate, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      avatar: true,
      role: true,
      organizationId: true,
    },
  });

  res.json({ status: 'success', data: { user } });
});

export default router;
