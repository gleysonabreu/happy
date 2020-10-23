import request from 'supertest';
import connection from '@shared/infra/typeorm';
import { container } from 'tsyringe';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import app from '../shared/infra/http/app';
import truncate from './config/truncate';
import { userFactory } from './config/factories';

describe('User', () => {
  beforeAll(async () => {
    await connection();
  });

  beforeEach(async () => {
    await truncate();
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
});
