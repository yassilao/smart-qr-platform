import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { prisma } from '../config/prisma';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Check in
router.post('/check-in', authenticate, async (req: Request, res: Response) => {
  const { sessionId, latitude, longitude } = req.body;

  const attendance = await prisma.attendance.create({
    data: {
      id: uuidv4(),
      userId: req.user!.id,
      sessionId,
      organizationId: req.user!.organizationId!,
      status: 'PRESENT',
      checkInTime: new Date(),
      latitude,
      longitude,
      ipAddress: req.ip,
    },
  });

  res.status(201).json({ status: 'success', data: { attendance } });
});

// Check out
router.post('/check-out/:attendanceId', authenticate, async (req: Request, res: Response) => {
  const attendance = await prisma.attendance.update({
    where: { id: req.params.attendanceId },
    data: {
      checkOutTime: new Date(),
    },
  });

  res.json({ status: 'success', data: { attendance } });
});

// Get attendance records
router.get('/session/:sessionId', authenticate, async (req: Request, res: Response) => {
  const records = await prisma.attendance.findMany({
    where: {
      sessionId: req.params.sessionId,
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  res.json({ status: 'success', data: { records } });
});

export default router;
