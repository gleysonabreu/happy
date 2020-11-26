import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import OrphanagesRepository from '../infra/typeorm/repositories/OrphanagesRepository';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

interface IRequest {
  name: string;
  longitude: number;
  latitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
}
@injectable()
class UpdateOrphanageService {
  constructor(
    @inject(OrphanagesRepository)
    private orphanageRepository: IOrphanagesRepository,
  ) {}

  execute = async (
    id: string,
    user_id: number,
    {
      about,
      instructions,
      latitude,
      longitude,
      name,
      open_on_weekends,
      opening_hours,
    }: IRequest,
  ) => {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
    });

    await schema.validate(
      {
        id,
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
      },
      {
        abortEarly: false,
      },
    );

    const orphanage = await this.orphanageRepository.findById(id);

    if (!orphanage) throw new AppError('Orphanage not found.');

    if (orphanage.user.id !== user_id)
      throw new AppError('You cannot update this orphanage');

    orphanage.name = name;
    orphanage.longitude = longitude;
    orphanage.latitude = latitude;
    orphanage.about = about;
    orphanage.instructions = instructions;
    orphanage.opening_hours = opening_hours;
    orphanage.open_on_weekends = open_on_weekends;
    const orphanageUpdated = await this.orphanageRepository.update(orphanage);

    return orphanageUpdated;
  };
}
export default UpdateOrphanageService;
