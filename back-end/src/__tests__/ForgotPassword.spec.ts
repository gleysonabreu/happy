import request from 'supertest';
import connection from '@shared/infra/typeorm';
import { container } from 'tsyringe';
import ICreateUsersService from '@modules/users/services/CreateUsersService';
import ForgotPasswordService from '@modules/users/services/ForgotPasswordService';
import app from '../shared/infra/http/app';
import truncate from './config/truncate';
import { userFactory } from './config/factories';

describe('ForgotPassword', () => {
  beforeAll(async () => {
    await connection();
  });

  beforeEach(async () => {
    await truncate();
  });

  it('should send an email for recovery password', async () => {
    const userFaker = await userFactory({});
    const createUser = container.resolve(ICreateUsersService);
    const user = await createUser.execute(userFaker);

    const response = await request(app).get('/api/v1/forgotpassword').send({
      email: user.createUser.email,
    });

    expect(response.status).toBe(204);
  });

  it('should check the token forgot password', async () => {
    const userFaker = await userFactory({});
    const createUser = container.resolve(ICreateUsersService);
    const user = await createUser.execute(userFaker);

    const passwordService = container.resolve(ForgotPasswordService);
    const token = await passwordService.execute({
      email: user.createUser.email,
    });

    const response = await request(app)
      .get('/api/v1/forgotpassword/validation')
      .query({
        forgot_password_token: token,
      });

    expect(response.status).toBe(204);
  });

  it('should check the token forgot password is invalid', async () => {
    const userFaker = await userFactory({});
    const createUser = container.resolve(ICreateUsersService);
    const user = await createUser.execute(userFaker);

    const passwordService = container.resolve(ForgotPasswordService);
    const token = await passwordService.execute({
      email: user.createUser.email,
    });

    const response = await request(app)
      .get('/api/v1/forgotpassword/validation')
      .query({
        forgot_password_token: `${token}784`,
      });

    expect(response.status).toBe(400);
  });

  it('should not change the users password if the passwords are not the same', async () => {
    const userFaker = await userFactory({});
    const createUser = container.resolve(ICreateUsersService);
    const user = await createUser.execute(userFaker);

    const passwordService = container.resolve(ForgotPasswordService);
    const token = await passwordService.execute({
      email: user.createUser.email,
    });

    const response = await request(app).post('/api/v1/forgotpassword').send({
      newPassword: '12345678',
      repeatNewPassword: '1234567',
      token,
    });

    expect(response.status).toBe(400);
  });

  it('should change password user', async () => {
    const userFaker = await userFactory({});
    const createUser = container.resolve(ICreateUsersService);
    const user = await createUser.execute(userFaker);

    const passwordService = container.resolve(ForgotPasswordService);
    const token = await passwordService.execute({
      email: user.createUser.email,
    });

    const response = await request(app).post('/api/v1/forgotpassword').send({
      newPassword: '1234567',
      repeatNewPassword: '1234567',
      token,
    });

    expect(response.status).toBe(204);
  });
});
