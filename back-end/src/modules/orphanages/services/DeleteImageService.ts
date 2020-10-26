import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import path from 'path';
import { folder } from '@config/upload';
import * as Yup from 'yup';
import IImagesRepository from '../repositories/IImagesRepository';
import ImagesRepository from '../infra/typeorm/repositories/ImagesRepository';

@injectable()
class DeleteImageService {
  constructor(
    @inject(ImagesRepository)
    private ImagesRepository: IImagesRepository,
  ) {}

  execute = async (id: number, user_id: number) => {
    const validation = Yup.object().shape({
      id: Yup.number().required(),
      user_id: Yup.number().required(),
    });

    await validation.validate(
      { id, user_id },
      {
        abortEarly: false,
      },
    );

    const image = await this.ImagesRepository.findImageById(id);

    if (!image) throw new AppError('Image not found.');

    if (image.orphanage.user.id !== user_id)
      throw new AppError('You cannot delete this image.');

    const pathFile = path.resolve(folder, image.path);
    if (!fs.existsSync(pathFile)) throw new AppError('Image path not found.');

    fs.unlinkSync(pathFile);
    await this.ImagesRepository.delete(id);
  };
}

export default DeleteImageService;
