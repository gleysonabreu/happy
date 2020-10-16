import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import Users from '../infra/typeorm/entities/Users';

export default interface IUsers {
  create(_user: ICreateUsersDTO): Promise<Users>;
  show(_id: number | string): Promise<Users | undefined>;
}
