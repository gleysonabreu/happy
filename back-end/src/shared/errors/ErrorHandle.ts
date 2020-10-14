import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import AppError from './AppError';

interface ValidationErrors {
  [key: string]: string[];
}

const ErrorHandle = (
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'Error',
      message: error.message,
    });
  }
  if (error instanceof ValidationError) {
    const errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({
      message: 'Validation fails',
      errors,
    });
  }
  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export default ErrorHandle;
