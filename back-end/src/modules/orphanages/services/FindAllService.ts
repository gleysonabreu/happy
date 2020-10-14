import { inject, injectable } from 'tsyringe';
import Orphanage from '../infra/typeorm/entities/Orphanage';
import OrphanagesRepository from '../infra/typeorm/repositories/OrphanagesRepository';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

@injectable()
class FindAllService {
  constructor(
    @inject(OrphanagesRepository)
    private orphanageRepository: IOrphanagesRepository,
  ) {}

  execute = async (): Promise<Orphanage[] | undefined> => {
    const orphanages = await this.orphanageRepository.findAll();

    return orphanages;
  };
}

export default FindAllService;
