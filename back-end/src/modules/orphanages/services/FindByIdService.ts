import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '@shared/errors/AppError';
import OrphanagesRepository from '../infra/typeorm/repositories/OrphanagesRepository';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

@injectable()
class FindByIdService {
  constructor(
    @inject(OrphanagesRepository)
    private orphanagesRepository: IOrphanagesRepository,
  ) {}

  execute = async (id: string) => {
    const validation = Yup.object().shape({
      id: Yup.number().required(),
    });

    await validation.validate(
      { id },
      {
        abortEarly: false,
      },
    );

    const orphanage = await this.orphanagesRepository.findById(id);

    if (!orphanage) throw new AppError('Orphanage not found.');

    return orphanage;
  };
}

export default FindByIdService;
