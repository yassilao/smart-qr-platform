import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { prisma } from '../config/prisma';

const router = Router();

// Get notifications
router.get('/', authenticate, async (req: Request, res: Response) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user!.id },
    take: 50,
    orderBy: { createdAt: 'desc' },
  });

  res.json({ status: 'success', data: { notifications } });
});

// Mark as read
router.put('/:id/read', authenticate, async (req: Request, res: Response) => {
  const notification = await prisma.notification.update({
    where: { id: req.params.id },
    data: { read: true },
  });

  res.json({ status: 'success', data: { notification } });
});

export default router;
