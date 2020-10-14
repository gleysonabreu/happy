import ICreateOrphanagesDTO from '../dtos/ICreateOrphanagesDTO';
import Orphanage from '../infra/typeorm/entities/Orphanage';

export default interface IOrphanagesRepository {
  create(_data: ICreateOrphanagesDTO): Promise<Orphanage>;
  findAll(): Promise<Orphanage[] | undefined>;
  findById(_id: string): Promise<Orphanage | undefined>;
}
