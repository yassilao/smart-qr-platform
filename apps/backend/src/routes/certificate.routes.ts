import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { prisma } from '../config/prisma';
import { NotFoundError } from '../middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get user certificates
router.get('/user/me', authenticate, async (req: Request, res: Response) => {
  const certificates = await prisma.certificate.findMany({
    where: {
      userId: req.user!.id,
    },
    include: {
      course: true,
    },
  });

  res.json({ status: 'success', data: { certificates } });
});

// Get certificate by ID
router.get('/:id', async (req: Request, res: Response) => {
  const certificate = await prisma.certificate.findUnique({
    where: { id: req.params.id },
    include: {
      user: true,
      course: true,
    },
  });

  if (!certificate) {
    throw new NotFoundError('Certificate');
  }

  res.json({ status: 'success', data: { certificate } });
});

// Verify certificate
router.get('/verify/:certificateId', async (req: Request, res: Response) => {
  const certificate = await prisma.certificate.findUnique({
    where: { certificateId: req.params.certificateId },
    include: {
      user: true,
      course: true,
    },
  });

  if (!certificate) {
    res.status(404).json({ status: 'error', message: 'Certificate not found' });
    return;
  }

  res.json({
    status: 'success',
    verified: true,
    data: { certificate },
  });
});

export default router;
