import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import AppError from '@shared/errors/AppError';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IToken {
  id: number;
  email: string;
}

@injectable()
class ValidationForgotPasswordService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  execute = async (forgot_password_token: string) => {
    const validation = Yup.object().shape({
      forgot_password_token: Yup.string().required(),
    });
    await validation.validate({ forgot_password_token }, { abortEarly: false });

    try {
      const token = <IToken>(
        jwt.verify(
          forgot_password_token,
          process.env.SECRET_TOKEN_FORGOT_PASSWORD,
        )
      );

      return token;
    } catch (error) {
      throw new AppError(error.message);
    }
  };
}

export default ValidationForgotPasswordService;
