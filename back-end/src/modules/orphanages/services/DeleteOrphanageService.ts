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

  execute = async (id: string, user_id: number) => {
    const checkOrphanage = await this.orphanageRepository.findById(id);

    if (!checkOrphanage) throw new AppError('Orphanage not found.');

    if (checkOrphanage.user.id !== user_id)
      throw new AppError('You cannot delete this orphanage');

    if (checkOrphanage.images) {
      checkOrphanage.images.forEach(image => {
        const pathFile = path.resolve(folder, image.path);
        if (!fs.existsSync(pathFile)) throw new AppError('Image not found');
        fs.unlinkSync(pathFile);
      });
    }
    await this.orphanageRepository.delete(checkOrphanage);
  };
}

export default DeleteOrphanageService;
