import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { prisma } from '../config/prisma';
import { NotFoundError } from '../middleware/errorHandler';

const router = Router();

// Get all users (Organization Admin only)
router.get('/', authenticate, authorize('ORGANIZATION_ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    where: {
      organizationId: req.user!.organizationId,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
    },
  });

  res.json({ status: 'success', data: { users } });
});

// Get user by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
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

  if (!user) {
    throw new NotFoundError('User');
  }

  res.json({ status: 'success', data: { user } });
});

// Update user profile
router.put('/:id', authenticate, async (req: Request, res: Response) => {
  const { firstName, lastName, avatar } = req.body;

  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: {
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      avatar: avatar || undefined,
    },
  });

  res.json({ status: 'success', data: { user } });
});

export default router;
