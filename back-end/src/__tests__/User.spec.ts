import request from 'supertest';
import connection from '@shared/infra/typeorm';
import Users from '@modules/users/infra/typeorm/entities/Users';
import app from '../shared/infra/http/app';

describe('User', () => {
  beforeAll(async () => {
    await connection();
  });
  it('should create a user with valid information', async () => {
    const user = new Users();
    user.name = 'Harry Potter';
    user.email = 'harrypotter@warner.com';
    user.password = '32841516';
    const response = await request(app).post('/api/v1/users').send(user);

    expect(response.status).toBe(200);
  });

  it('should return user data and token', async () => {
    const user = new Users();
    user.name = 'Harry Potter';
    user.email = 'harrypotter2@warner.com';
    user.password = '32841516';
    const response = await request(app).post('/api/v1/users').send(user);

    expect(response.body).toHaveProperty('user.id');
    expect(response.body).toHaveProperty('user.name');
    expect(response.body).toHaveProperty('user.email');
    expect(response.body).toHaveProperty('token');
  });

  it('should encrypt user password', async () => {
    const user = new Users();
    user.name = 'Gleys';
    user.email = 'gleys@google.com';
    user.password = '32841516';
    await user.encryptPassword();

    const hashPassword = await user.checkPasswordIsValid('32841516');
    expect(hashPassword).toBe(true);
  });

  it('should not create user with invalid information', async () => {
    const user = new Users();
    user.name = 'Harry Potter';
    user.password = '32841516';
    const response = await request(app).post('/api/v1/users').send(user);

    expect(response.status).toBe(400);
  });

  it('should search for a specific user with valid id.', async () => {
    const id = 38;
    const response = await request(app).get(`/api/v1/users/${id}`);

    expect(response.status).toBe(200);
  });

  it('should return data user when the user exists.', async () => {
    const id = 38;
    const response = await request(app).get(`/api/v1/users/${id}`);

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
