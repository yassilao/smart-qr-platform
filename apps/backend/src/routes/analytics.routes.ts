import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { prisma } from '../config/prisma';

const router = Router();

// Get course analytics
router.get('/courses/:courseId', authenticate, async (req: Request, res: Response) => {
  const analytics = await prisma.courseAnalytics.findUnique({
    where: { courseId: req.params.courseId },
  });

  res.json({ status: 'success', data: { analytics } });
});

// Get QR code analytics
router.get('/qr/:qrCodeId', authenticate, async (req: Request, res: Response) => {
  const scans = await prisma.qrScan.findMany({
    where: { qrCodeId: req.params.qrCodeId },
  });

  const totalScans = scans.length;
  const uniqueScans = new Set(scans.map((s) => s.userIp)).size;

  res.json({
    status: 'success',
    data: {
      totalScans,
      uniqueScans,
      scans,
    },
  });
});

// Get user activity
router.get('/users/:userId', authenticate, async (req: Request, res: Response) => {
  const activity = await prisma.auditLog.findMany({
    where: { userId: req.params.userId },
    take: 50,
    orderBy: { createdAt: 'desc' },
  });

  res.json({ status: 'success', data: { activity } });
});

export default router;
