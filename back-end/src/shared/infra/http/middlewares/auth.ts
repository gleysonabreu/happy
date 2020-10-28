import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IJwt {
  id: number;
  name: string;
  email: string;
}

const authMid = async (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  const { authorization } = request.headers;

  if (!authorization) throw new AppError('No token provided', 401);

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') throw new AppError('Bearer does not exist.', 401);

  try {
    const tokenDecodded = <IJwt>jwt.verify(token, process.env.SECRET_TOKEN);
    request.userId = tokenDecodded.id;

    return next();
  } catch (error) {
    throw new AppError('Token invalid', 401);
  }
};

export default authMid;
