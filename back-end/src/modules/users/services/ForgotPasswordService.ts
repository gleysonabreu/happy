import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import { sendMail } from '@shared/services/Mail';
import IForgotPassword from '../dtos/IForgotPassword';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ForgotPassword {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  execute = async ({ email }: IForgotPassword) => {
    const validation = Yup.object().shape({
      email: Yup.string().required(),
    });
    await validation.validate({ email }, { abortEarly: false });

    const user = await this.usersRepository.show(email);

    if (!user) throw new AppError('User not found');

    try {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.SECRET_TOKEN_FORGOT_PASSWORD,
        {
          expiresIn: '1h',
        },
      );

      await sendMail({
        to: user.email,
        message: `Hello ${user.email}, if you requested a password change
        please copy and paste the following URL into your browser:
        http://localhost:3333/api/v1/forgotpassword/validation?forgot_password_token=${token}`,
        subject: 'Forgot password from Happy',
      });

      return token;
    } catch (error) {
      throw new AppError('Email not sent, try again.');
    }
  };
}

export default ForgotPassword;
