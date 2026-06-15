import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { prisma } from '../config/prisma';
import { NotFoundError, ValidationError } from '../middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get all courses
router.get('/', authenticate, async (req: Request, res: Response) => {
  const courses = await prisma.course.findMany({
    where: {
      organizationId: req.user!.organizationId,
    },
    include: {
      instructor: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      _count: {
        select: {
          enrollments: true,
          modules: true,
        },
      },
    },
  });

  res.json({ status: 'success', data: { courses } });
});

// Create course
router.post('/', authenticate, authorize('INSTRUCTOR', 'ORGANIZATION_ADMIN'), async (req: Request, res: Response) => {
  const { title, description, category, tags } = req.body;

  if (!title) {
    throw new ValidationError('Title is required');
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const course = await prisma.course.create({
    data: {
      id: uuidv4(),
      title,
      slug,
      description,
      category,
      tags: tags || [],
      organizationId: req.user!.organizationId!,
      instructorId: req.user!.id,
      status: 'DRAFT',
      visibility: 'PRIVATE',
    },
  });

  res.status(201).json({ status: 'success', data: { course } });
});

// Get course by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  const course = await prisma.course.findUnique({
    where: { id: req.params.id },
    include: {
      modules: {
        include: {
          chapters: {
            include: {
              lessons: true,
            },
          },
        },
      },
      instructor: true,
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
  });

  if (!course) {
    throw new NotFoundError('Course');
  }

  res.json({ status: 'success', data: { course } });
});

// Update course
router.put('/:id', authenticate, authorize('INSTRUCTOR', 'ORGANIZATION_ADMIN'), async (req: Request, res: Response) => {
  const { title, description, category, tags, status, visibility } = req.body;

  const course = await prisma.course.update({
    where: { id: req.params.id },
    data: {
      title: title || undefined,
      description: description || undefined,
      category: category || undefined,
      tags: tags || undefined,
      status: status || undefined,
      visibility: visibility || undefined,
    },
  });

  res.json({ status: 'success', data: { course } });
});

// Enroll in course
router.post('/:id/enroll', authenticate, async (req: Request, res: Response) => {
  const enrollment = await prisma.courseEnrollment.create({
    data: {
      id: uuidv4(),
      userId: req.user!.id,
      courseId: req.params.id,
    },
  });

  res.status(201).json({ status: 'success', data: { enrollment } });
});

export default router;
