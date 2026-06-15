import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { prisma } from '../config/prisma';
import { NotFoundError, ValidationError } from '../middleware/errorHandler';
import { generateQRCode, generateUniqueQRCode } from '../utils/qrcode';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Generate QR code
router.post('/generate', authenticate, authorize('INSTRUCTOR', 'ORGANIZATION_ADMIN'), async (req: Request, res: Response) => {
  const { entityType, entityId, expiresAt, password } = req.body;

  if (!entityType || !entityId) {
    throw new ValidationError('entityType and entityId are required');
  }

  const code = generateUniqueQRCode();
  const qrUrl = `${process.env.NEXT_PUBLIC_APP_URL}/qr/${code}`;
  const qrImage = await generateQRCode(qrUrl);

  const qrCode = await prisma.qrCode.create({
    data: {
      id: uuidv4(),
      code,
      url: qrUrl,
      entityType,
      entityId,
      organizationId: req.user!.organizationId!,
      createdBy: req.user!.id,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      password: password || undefined,
    },
  });

  res.status(201).json({
    status: 'success',
    data: {
      qrCode,
      qrImage,
    },
  });
});

// Get QR code
router.get('/:code', async (req: Request, res: Response) => {
  const qrCode = await prisma.qrCode.findUnique({
    where: { code: req.params.code },
  });

  if (!qrCode) {
    throw new NotFoundError('QR Code');
  }

  // Check expiration
  if (qrCode.expiresAt && qrCode.expiresAt < new Date()) {
    res.status(410).json({ status: 'error', message: 'QR code has expired' });
    return;
  }

  // Check max scans
  if (qrCode.maxScans && qrCode.currentScans >= qrCode.maxScans) {
    res.status(410).json({ status: 'error', message: 'QR code scan limit reached' });
    return;
  }

  // Record scan
  await prisma.qrCode.update({
    where: { id: qrCode.id },
    data: { currentScans: { increment: 1 } },
  });

  await prisma.qrScan.create({
    data: {
      id: uuidv4(),
      qrCodeId: qrCode.id,
      userIp: req.ip || 'unknown',
      userAgent: req.get('user-agent') || '',
      browser: req.get('user-agent')?.split(' ')[0] || 'unknown',
    },
  });

  res.json({
    status: 'success',
    data: {
      qrCode,
      redirectTo: qrCode.url,
    },
  });
});

export default router;
