import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import * as Sentry from '@sentry/node';

export interface AppError extends Error {
  status?: number;
  code?: string;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = (error as AppError).status || 500;
  const message = error.message || 'Internal Server Error';
  const code = (error as AppError).code || 'INTERNAL_ERROR';

  // Log error
  logger.error('Error:', {
    status,
    message,
    code,
    path: req.path,
    method: req.method,
    body: req.body,
    stack: error.stack,
  });

  // Capture exception in Sentry
  if (status === 500) {
    Sentry.captureException(error, {
      tags: {
        status,
        code,
      },
    });
  }

  res.status(status).json({
    status: 'error',
    code,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

export class ValidationError extends Error implements AppError {
  status = 400;
  code = 'VALIDATION_ERROR';
  isOperational = true;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class AuthenticationError extends Error implements AppError {
  status = 401;
  code = 'AUTHENTICATION_ERROR';
  isOperational = true;

  constructor(message: string = 'Authentication failed') {
    super(message);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class AuthorizationError extends Error implements AppError {
  status = 403;
  code = 'AUTHORIZATION_ERROR';
  isOperational = true;

  constructor(message: string = 'Access denied') {
    super(message);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

export class NotFoundError extends Error implements AppError {
  status = 404;
  code = 'NOT_FOUND';
  isOperational = true;

  constructor(resource: string) {
    super(`${resource} not found`);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
