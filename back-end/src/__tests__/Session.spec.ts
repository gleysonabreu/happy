import request from 'supertest';
import connection from '@shared/infra/typeorm';
import Users from '@modules/users/infra/typeorm/entities/Users';
import { Connection } from 'typeorm';
import app from '../shared/infra/http/app';

describe('Authentication', () => {
  let connectionApp: Connection;
  beforeAll(async () => {
    connectionApp = await connection();
  });

  afterAll(async done => {
    await connectionApp.close();
    done();
  });

  it('should authenticate with valid credentials', async () => {
    const user = new Users();
    user.email = 'userteste@hotmail.com';
    user.password = '123456';
    const response = await request(app).get('/api/v1/authenticate').send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = new Users();
    user.email = 'userteste@hotmail.com';
    user.password = '1234567';

    const response = await request(app).get('/api/v1/authenticate').send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(400);
  });

  it('should return jwt token when authenticated', async () => {
    const user = new Users();
    user.email = 'userteste@hotmail.com';
    user.password = '123456';

    const response = await request(app).get('/api/v1/authenticate').send({
      email: user.email,
      password: user.password,
    });

    expect(response.body).toHaveProperty('token');
  });
});
