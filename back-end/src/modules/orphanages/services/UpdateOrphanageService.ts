import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import OrphanagesRepository from '../infra/typeorm/repositories/OrphanagesRepository';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

@injectable()
class UpdateOrphanageService {
  constructor(
    @inject(OrphanagesRepository)
    private orphanageRepository: IOrphanagesRepository,
  ) {}

  execute = async (id: string, user_id: number) => {
    const orphanage = await this.orphanageRepository.findById(id);

    if (!orphanage) throw new AppError('Orphanage not found.');

    if (orphanage.user.id !== user_id)
      throw new AppError('You cannot update this orphanage');

    orphanage.name = 'Teste';
    await this.orphanageRepository.update(orphanage);
  };
}
export default UpdateOrphanageService;
