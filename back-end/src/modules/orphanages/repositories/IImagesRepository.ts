import Image from '../infra/typeorm/entities/Image';

export default interface IImagesRepository {
  delete(_id: number): Promise<void>;
  findImageById(_id: number): Promise<Image | undefined>;
}
