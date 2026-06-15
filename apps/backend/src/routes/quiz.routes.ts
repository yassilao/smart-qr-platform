import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { prisma } from '../config/prisma';
import { NotFoundError, ValidationError } from '../middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Create quiz
router.post('/', authenticate, authorize('INSTRUCTOR', 'ORGANIZATION_ADMIN'), async (req: Request, res: Response) => {
  const { title, description, passingScore, duration } = req.body;

  if (!title) {
    throw new ValidationError('Title is required');
  }

  const quiz = await prisma.quiz.create({
    data: {
      id: uuidv4(),
      title,
      description,
      passingScore: passingScore || 60,
      duration: duration || undefined,
      organizationId: req.user!.organizationId!,
      status: 'DRAFT',
    },
  });

  res.status(201).json({ status: 'success', data: { quiz } });
});

// Get quiz with questions
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id: req.params.id },
    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
  });

  if (!quiz) {
    throw new NotFoundError('Quiz');
  }

  res.json({ status: 'success', data: { quiz } });
});

// Add question to quiz
router.post('/:id/questions', authenticate, authorize('INSTRUCTOR', 'ORGANIZATION_ADMIN'), async (req: Request, res: Response) => {
  const { type, question, options, correctAnswer, explanation } = req.body;

  if (!question) {
    throw new ValidationError('Question is required');
  }

  const newQuestion = await prisma.question.create({
    data: {
      id: uuidv4(),
      quizId: req.params.id,
      type,
      question,
      explanation,
      order: 1,
      marks: 1,
      options: {
        create: options.map((opt: any, idx: number) => ({
          id: uuidv4(),
          text: opt.text,
          isCorrect: idx === correctAnswer,
          order: idx,
        })),
      },
    },
  });

  res.status(201).json({ status: 'success', data: { question: newQuestion } });
});

// Submit quiz attempt
router.post('/:id/submit', authenticate, async (req: Request, res: Response) => {
  const { answers } = req.body;

  const quiz = await prisma.quiz.findUnique({
    where: { id: req.params.id },
    include: { questions: { include: { options: true } } },
  });

  if (!quiz) {
    throw new NotFoundError('Quiz');
  }

  // Calculate score
  let score = 0;
  const submittedAnswers = [];

  for (const answer of answers) {
    const question = quiz.questions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const correctOption = question.options.find((o) => o.isCorrect);
    const isCorrect = answer.selectedOptionId === correctOption?.id;

    if (isCorrect) {
      score += question.marks;
    }

    submittedAnswers.push({
      id: uuidv4(),
      questionId: answer.questionId,
      selectedOptions: [answer.selectedOptionId],
      isCorrect,
      marksObtained: isCorrect ? question.marks : 0,
    });
  }

  const attempt = await prisma.quizAttempt.create({
    data: {
      id: uuidv4(),
      userId: req.user!.id,
      quizId: req.params.id,
      attemptNumber: 1,
      score,
      totalMarks: quiz.questions.reduce((sum, q) => sum + q.marks, 0),
      passed: score >= quiz.passingScore,
      completedAt: new Date(),
      answers: {
        create: submittedAnswers,
      },
    },
  });

  res.json({ status: 'success', data: { attempt } });
});

export default router;
