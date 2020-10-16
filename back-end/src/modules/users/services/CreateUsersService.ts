import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import AppError from '@shared/errors/AppError';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ICreateUsersService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  execute = async ({ email, name, password }: ICreateUsersDTO) => {
    const user = {
      email,
      name,
      password,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });
    await schema.validate(user, { abortEarly: false });

    const checkUser = await this.usersRepository.show(user.email);

    if (checkUser) throw new AppError('This user already exists.');

    const hashPassword = await bcrypt.hash(
      user.password,
      Number(process.env.SALT_ROUNDS),
    );

    user.password = hashPassword;
    const createUser = await this.usersRepository.create(user);

    return createUser;
  };
}

export default ICreateUsersService;
