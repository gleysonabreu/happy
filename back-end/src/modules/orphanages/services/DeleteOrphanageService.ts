import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import OrphanagesRepository from '../infra/typeorm/repositories/OrphanagesRepository';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

@injectable()
class DeleteOrphanageService {
  constructor(
    @inject(OrphanagesRepository)
    private orphanageRepository: IOrphanagesRepository,
  ) {}

  execute = async (id: string) => {
    const checkOrphanage = await this.orphanageRepository.findById(id);

    if (!checkOrphanage) throw new AppError('Orphanage not found.');

    await this.orphanageRepository.delete(checkOrphanage);
  };
}

export default DeleteOrphanageService;
