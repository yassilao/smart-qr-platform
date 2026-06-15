import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { prisma } from '../config/prisma';
import { NotFoundError, ValidationError } from '../middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get organization
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  const organization = await prisma.organization.findUnique({
    where: { id: req.params.id },
  });

  if (!organization) {
    throw new NotFoundError('Organization');
  }

  res.json({ status: 'success', data: { organization } });
});

// Update organization
router.put('/:id', authenticate, authorize('ORGANIZATION_ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response) => {
  const { name, description, logo, website } = req.body;

  const organization = await prisma.organization.update({
    where: { id: req.params.id },
    data: {
      name: name || undefined,
      description: description || undefined,
      logo: logo || undefined,
      website: website || undefined,
    },
  });

  res.json({ status: 'success', data: { organization } });
});

// Get organization users
router.get('/:id/users', authenticate, authorize('ORGANIZATION_ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    where: { organizationId: req.params.id },
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

export default router;
