import request from 'supertest';
import createConnection from '@shared/infra/typeorm';
import { container } from 'tsyringe';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import { Connection, getConnection } from 'typeorm';
import usersView from '@modules/users/infra/http/views/users.view';
import Users from '@modules/users/infra/typeorm/entities/Users';
import { array } from 'yup';
import app from '../shared/infra/http/app';
import truncate from './config/truncate';
import { userFactory } from './config/factories';

let connection: Connection;

describe('User', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  beforeEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    const myConnection = getConnection();
    await connection.close();
    await myConnection.close();
  });

  it('should create a user with valid information', async () => {
    const user = await userFactory({});

    const response = await request(app).post('/api/v1/users').send(user);

    expect(response.status).toBe(200);
  });

  it('should return user data and token', async () => {
    const user = await userFactory({});

    const response = await request(app).post('/api/v1/users').send(user);

    expect(response.body).toHaveProperty('user.id');
    expect(response.body).toHaveProperty('user.name');
    expect(response.body).toHaveProperty('user.email');
    expect(response.body).toHaveProperty('token');
  });

  it('should encrypt user password', async () => {
    const user = await userFactory({
      password: '15152020',
    });
    await user.encryptPassword();

    const hashPassword = await user.checkPasswordIsValid('15152020');
    expect(hashPassword).toBe(true);
  });

  it('should not create user with invalid information', async () => {
    const user = await userFactory({
      hide: 'email',
    });
    const response = await request(app).post('/api/v1/users').send(user);

    expect(response.status).toBe(400);
  });

  it('should search for a specific user with valid id.', async () => {
    const user = await userFactory({});
    const createUserService = container.resolve(CreateUsersService);
    const userCreated = await createUserService.execute(user);

    const response = await request(app).get(
      `/api/v1/users/${userCreated.createUser.id}`,
    );

    expect(response.status).toBe(200);
  });

  it('should return data user when the user exists.', async () => {
    const user = await userFactory({});
    const createUserService = container.resolve(CreateUsersService);
    const userCreated = await createUserService.execute(user);
    const response = await request(app).get(
      `/api/v1/users/${userCreated.createUser.id}`,
    );

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  it('should not search for a specific user with invalid id', async () => {
    const id = 500;
    const response = await request(app).get(`/api/v1/users/${id}`);

    expect(response.status).toBe(400);
  });

  it('should return only the information determined by the users view', async () => {
    const arrayUser: Users[] = [];
    const user1 = new Users();
    user1.id = 1;
    user1.email = 'fhfhduihf@ojihf.com';
    user1.name = 'jfhsfg';
    user1.password = 'dadad';

    arrayUser.push(user1);
    arrayUser.push(user1);

    const userView = usersView.renderMany(arrayUser);

    expect(typeof userView).toBe('object');
  });
});
