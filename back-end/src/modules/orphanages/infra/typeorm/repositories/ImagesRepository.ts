import IImagesRepository from '@modules/orphanages/repositories/IImagesRepository';
import { getRepository, Repository } from 'typeorm';
import Image from '../entities/Image';

class ImagesRepository implements IImagesRepository {
  private ormRepository: Repository<Image>;

  constructor() {
    this.ormRepository = getRepository(Image);
  }

  delete = async (id: number): Promise<void> => {
    await this.ormRepository.delete({ id });
  };
}

export default ImagesRepository;
