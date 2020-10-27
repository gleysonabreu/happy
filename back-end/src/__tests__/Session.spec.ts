import request from 'supertest';
import createConnection from '@shared/infra/typeorm';
import { container } from 'tsyringe';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import { Connection, getConnection } from 'typeorm';
import app from '../shared/infra/http/app';
import truncate from './config/truncate';
import { userFactory } from './config/factories';

let connection: Connection;

describe('Authentication', () => {
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

  it('should not access a route without being authenticated', async () => {
    const id = 5484;
    const repsonse = await request(app).delete(`/api/v1/orphanages/${id}`);

    expect(repsonse.status).toBe(401);
  });

  it('should access a route when authenticated but not delete orphanage', async () => {
    const userFac = await userFactory({});
    const userService = container.resolve(CreateUsersService);
    const user = await userService.execute(userFac);
    const id = 145454;

    const response = await request(app)
      .delete(`/api/v1/orphanages/${id}`)
      .set('Authorization', `Bearer ${user.authentication}`);

    expect(response.status).toBe(400);
  });
});
