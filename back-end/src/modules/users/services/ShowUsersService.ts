import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ShowUsersService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  execute = async (id: number | string) => {
    const validation = Yup.object().shape({
      id: Yup.number().strict(true),
    });

    await validation.validate(
      { id },
      {
        abortEarly: false,
      },
    );
    const user = await this.usersRepository.show(id);

    if (!user) throw new AppError('User not found.');

    return user;
  };
}

export default ShowUsersService;
