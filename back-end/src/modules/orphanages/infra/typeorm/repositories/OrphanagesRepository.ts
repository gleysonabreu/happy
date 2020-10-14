import { getRepository, Repository } from 'typeorm';
import ICreateOrphanagesDTO from '../../../dtos/ICreateOrphanagesDTO';
import IOrphanagesRepository from '../../../repositories/IOrphanagesRepository';
import Orphanage from '../entities/Orphanage';

class OrphanagesRepository implements IOrphanagesRepository {
  private ormRepository: Repository<Orphanage>;

  constructor() {
    this.ormRepository = getRepository(Orphanage);
  }

  findById = async (id: string): Promise<Orphanage | undefined> => {
    const orphanage = await this.ormRepository.findOne(id, {
      relations: ['images'],
    });

    return orphanage;
  };

  findAll = async (): Promise<Orphanage[] | undefined> => {
    const orphanages = await this.ormRepository.find({
      relations: ['images'],
    });
    return orphanages;
  };

  create = async (data: ICreateOrphanagesDTO) => {
    const orphanage = this.ormRepository.create(data);

    await this.ormRepository.save(orphanage);

    return orphanage;
  };
}

export default OrphanagesRepository;
