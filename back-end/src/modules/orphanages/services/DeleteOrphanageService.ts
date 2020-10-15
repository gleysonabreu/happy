import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { folder } from '@config/upload';
import fs from 'fs';
import path from 'path';
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

    if (checkOrphanage.images) {
      checkOrphanage.images.forEach(async image => {
        const pathFile = path.resolve(folder, image.path);

        fs.unlinkSync(pathFile);
      });
    }
  };
}

export default DeleteOrphanageService;
