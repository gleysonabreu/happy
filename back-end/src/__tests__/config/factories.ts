import faker from 'faker/locale/pt_BR';
import Users from '@modules/users/infra/typeorm/entities/Users';

interface IUserFactory {
  hide?: 'email' | 'password' | 'name' | undefined;
  email?: string;
  password?: string;
  name?: string;
}

export const userFactory = async (attr?: IUserFactory) => {
  const user = new Users();

  if (attr.hide !== 'password')
    user.password = attr.password ? attr.password : faker.internet.password();
  if (attr.hide !== 'email')
    user.email = attr.email ? attr.email : faker.internet.email();
  if (attr.hide !== 'name')
    user.name = attr.name ? attr.name : faker.name.findName();

  return user;
};

export const useOrphanage = async () => {
  const orphanage = {
    name: faker.name.findName(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    about: 'Hiii',
    instructions: 'Não',
    open_on_weekends: false,
    opening_hours: '6 AM',
    approved: true,
  };

  return orphanage;
};
