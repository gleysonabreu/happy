import { getRepository, Repository } from 'typeorm';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import Users from '../entities/Users';
import IUsersRepository from '../../../repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<Users>;

  constructor() {
    this.ormRepository = getRepository(Users);
  }

  show = async (id: number | string): Promise<Users | undefined> => {
    const userId = Number(id) ? id : null;
    const emailUser = String(id) ? id : null;

    const user = await this.ormRepository.findOne({
      where: [
        {
          id: userId,
        },
        {
          email: emailUser,
        },
      ],
      relations: ['orphanages', 'orphanages.images'],
    });

    return user;
  };

  create = async (user: ICreateUsersDTO): Promise<Users> => {
    const createUser = this.ormRepository.create(user);
    await this.ormRepository.save(createUser);

    return createUser;
  };
}

export default UsersRepository;
