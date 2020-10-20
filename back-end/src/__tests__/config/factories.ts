import faker from 'faker/locale/pt_BR';
import Users from '@modules/users/infra/typeorm/entities/Users';

interface IHideAttributes {
  hide?: 'email' | 'password' | 'name' | undefined;
  email?: string;
  password?: string;
  name?: string;
}

export const userFactory = async (attr?: IHideAttributes) => {
  const user = new Users();

  if (attr.hide !== 'password')
    user.password = attr.password ? attr.password : faker.internet.password();
  if (attr.hide !== 'email')
    user.email = attr.email ? attr.email : faker.internet.email();
  if (attr.hide !== 'name')
    user.name = attr.name ? attr.name : faker.name.findName();

  return user;
};
