import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import ISessionDTO from '../dtos/ISessionDTO';
import viewUser from '../infra/http/views/users.view';

@injectable()
class LoginService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  execute = async (user: ISessionDTO) => {
    const validation = Yup.object().shape({
      email: Yup.string().required().min(1),
      password: Yup.string().required().min(6),
    });

    await validation.validate(user, { abortEarly: false });

    const userSession = await this.usersRepository.show(user.email);

    if (!userSession) throw new AppError('User not found');

    if (!(await bcrypt.compare(user.password, userSession.password)))
      throw new AppError('Email or password invalid.');

    try {
      const token = jwt.sign(
        viewUser.render(userSession),
        process.env.SECRET_TOKEN,
        {
          expiresIn: 86400,
        },
      );

      return token;
    } catch (error) {
      throw new AppError('User authentication failed');
    }
  };
}

export default LoginService;
