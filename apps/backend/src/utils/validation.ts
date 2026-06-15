import { z, ZodSchema } from 'zod';
import { ValidationError } from '../middleware/errorHandler';

export const validate = <T>(schema: ZodSchema, data: unknown): T => {
  try {
    return schema.parse(data) as T;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
      throw new ValidationError(messages.join(', '));
    }
    throw error;
  }
};
