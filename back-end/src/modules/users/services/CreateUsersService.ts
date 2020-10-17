import { container, inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '@shared/errors/AppError';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import LoginService from './LoginService';
import Users from '../infra/typeorm/entities/Users';

@injectable()
class ICreateUsersService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  execute = async ({ email, name, password }: ICreateUsersDTO) => {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required().min(6),
    });

    const user = new Users();
    user.email = email;
    user.name = name;
    user.password = password;

    await schema.validate(user, { abortEarly: false });

    const checkUser = await this.usersRepository.show(user.email);

    if (checkUser) throw new AppError('This user already exists.');

    await user.encryptPassword();
    const createUser = await this.usersRepository.create(user);

    const loginService = container.resolve(LoginService);
    const authentication = await loginService.execute({ email, password });

    return { createUser, authentication };
  };
}

export default ICreateUsersService;
