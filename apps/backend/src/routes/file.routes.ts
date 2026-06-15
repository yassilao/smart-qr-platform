import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { prisma } from '../config/prisma';
import { NotFoundError } from '../middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Note: File upload handled by separate middleware
// This is basic file management

// Get files
router.get('/', authenticate, async (req: Request, res: Response) => {
  const files = await prisma.file.findMany({
    where: {
      organizationId: req.user!.organizationId,
    },
    take: 50,
    orderBy: { createdAt: 'desc' },
  });

  res.json({ status: 'success', data: { files } });
});

// Get file
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  const file = await prisma.file.findUnique({
    where: { id: req.params.id },
  });

  if (!file) {
    throw new NotFoundError('File');
  }

  res.json({ status: 'success', data: { file } });
});

// Delete file
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  await prisma.file.delete({
    where: { id: req.params.id },
  });

  res.json({ status: 'success', message: 'File deleted' });
});

export default router;
