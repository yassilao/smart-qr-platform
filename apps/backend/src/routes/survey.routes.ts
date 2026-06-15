import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { prisma } from '../config/prisma';
import { NotFoundError, ValidationError } from '../middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Create survey
router.post('/', authenticate, authorize('INSTRUCTOR', 'ORGANIZATION_ADMIN'), async (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title) {
    throw new ValidationError('Title is required');
  }

  const survey = await prisma.survey.create({
    data: {
      id: uuidv4(),
      title,
      description,
      organizationId: req.user!.organizationId!,
      status: 'draft',
    },
  });

  res.status(201).json({ status: 'success', data: { survey } });
});

// Get survey
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  const survey = await prisma.survey.findUnique({
    where: { id: req.params.id },
    include: {
      fields: true,
    },
  });

  if (!survey) {
    throw new NotFoundError('Survey');
  }

  res.json({ status: 'success', data: { survey } });
});

// Add field to survey
router.post('/:id/fields', authenticate, authorize('INSTRUCTOR', 'ORGANIZATION_ADMIN'), async (req: Request, res: Response) => {
  const { type, label, required, options } = req.body;

  const field = await prisma.surveyField.create({
    data: {
      id: uuidv4(),
      surveyId: req.params.id,
      type,
      label,
      required: required || false,
      options: options || [],
      order: 1,
    },
  });

  res.status(201).json({ status: 'success', data: { field } });
});

// Submit survey response
router.post('/:id/submit', authenticate, async (req: Request, res: Response) => {
  const { responses } = req.body;

  const response = await prisma.surveyResponse.create({
    data: {
      id: uuidv4(),
      userId: req.user!.id,
      surveyId: req.params.id,
      fieldResponses: {
        create: responses.map((r: any) => ({
          id: uuidv4(),
          fieldId: r.fieldId,
          value: r.value,
        })),
      },
    },
  });

  res.status(201).json({ status: 'success', data: { response } });
});

export default router;
