import { container, inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '@shared/errors/AppError';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import ValidationForgotPasswordService from './ValidationForgotPasswordService';

@injectable()
class ChangePasswordService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  execute = async ({ newPassword, repeatNewPassword, token }) => {
    const validation = Yup.object().shape({
      newPassword: Yup.string().required().min(6),
      repeatNewPassword: Yup.string().required().min(6),
      token: Yup.string().required(),
    });
    await validation.validate(
      { newPassword, repeatNewPassword, token },
      { abortEarly: false },
    );

    if (newPassword !== repeatNewPassword)
      throw new AppError('Passwords must be the same.');

    const validationForgotPassword = container.resolve(
      ValidationForgotPasswordService,
    );
    const dataUser = await validationForgotPassword.execute(token);

    const user = await this.usersRepository.show(dataUser.id);

    if (!user) throw new AppError('User not found');

    user.password = newPassword;
    await user.encryptPassword();

    await this.usersRepository.create(user);
  };
}

export default ChangePasswordService;
