import request from 'supertest';
import connection from '@shared/infra/typeorm';
import { container } from 'tsyringe';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import app from '../shared/infra/http/app';
import truncate from './config/truncate';
import { userFactory } from './config/factories';

describe('Authentication', () => {
  beforeAll(async () => {
    await connection();
  });

  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await userFactory({});

    const createUserService = container.resolve(CreateUsersService);
    await createUserService.execute(user);

    const response = await request(app).get('/api/v1/authenticate').send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await userFactory({});

    const createUserService = container.resolve(CreateUsersService);
    await createUserService.execute(user);

    const response = await request(app).get('/api/v1/authenticate').send({
      email: user.email,
      password: '15152020',
    });

    expect(response.status).toBe(400);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await userFactory({});

    const createUserService = container.resolve(CreateUsersService);
    await createUserService.execute(user);

    const response = await request(app).get('/api/v1/authenticate').send({
      email: user.email,
      password: user.password,
    });

    expect(response.body).toHaveProperty('token');
  });
});
