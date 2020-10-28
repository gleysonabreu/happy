import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import ICreateOrphanagesDTO from '../dtos/ICreateOrphanagesDTO';
import OrphanagesRepository from '../infra/typeorm/repositories/OrphanagesRepository';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

@injectable()
class ICreateOrphanagesService {
  constructor(
    @inject(OrphanagesRepository)
    private orphanagesRepository: IOrphanagesRepository,
  ) {}

  execute = async (data: ICreateOrphanagesDTO) => {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
      user: Yup.object().shape({
        id: Yup.number().required().min(1),
      }),
      approved: Yup.boolean().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = await this.orphanagesRepository.create(data);

    return orphanage;
  };
}

export default ICreateOrphanagesService;
