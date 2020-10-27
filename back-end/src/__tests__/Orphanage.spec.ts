import request from 'supertest';
import createConnection from '@shared/infra/typeorm';
import path from 'path';
import { container } from 'tsyringe';
import ICreateOrphanagesService from '@modules/orphanages/services/ICreateOrphanagesService';
import { Connection, getConnection } from 'typeorm';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import app from '../shared/infra/http/app';
import truncate from './config/truncate';
import { useOrphanage, userFactory } from './config/factories';
import truncateImages from './config/truncate_images';

const image = path.join(__dirname, '..', '..', 'uploads', 'baixados.png');
let connection: Connection;

describe('Orphanage', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  beforeEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    await truncateImages();
    const myConnection = getConnection();
    await connection.close();
    await myConnection.close();
  });

  it('should not create an orphanage without being authenticated', async () => {
    const orphanage = await useOrphanage();
    const response = await request(app)
      .post('/api/v1/orphanages')
      .field('name', orphanage.name)
      .field('latitude', orphanage.latitude)
      .field('longitude', orphanage.longitude)
      .field('about', orphanage.about)
      .field('instructions', orphanage.instructions)
      .field('opening_hours', orphanage.opening_hours)
      .field('open_on_weekends', orphanage.open_on_weekends)
      .field('approved', orphanage.approved)
      .attach('images', image);

    expect(response.status).toBe(401);
  });

  it('should create an orphanage with valid information', async () => {
    const userFac = await userFactory({});
    const userService = container.resolve(CreateUsersService);
    const user = await userService.execute(userFac);

    const orphanage = await useOrphanage();
    const response = await request(app)
      .post('/api/v1/orphanages')
      .field('name', orphanage.name)
      .field('latitude', orphanage.latitude)
      .field('longitude', orphanage.longitude)
      .field('about', orphanage.about)
      .field('instructions', orphanage.instructions)
      .field('opening_hours', orphanage.opening_hours)
      .field('open_on_weekends', orphanage.open_on_weekends)
      .field('approved', orphanage.approved)
      .attach('images', image)
      .set('Authorization', `Bearer ${user.authentication}`);

    expect(response.status).toBe(200);
  });

  it('should return orphanage data', async () => {
    const userFac = await userFactory({});
    const userService = container.resolve(CreateUsersService);
    const user = await userService.execute(userFac);

    const orphanage = await useOrphanage();
    const response = await request(app)
      .post('/api/v1/orphanages')
      .field('name', orphanage.name)
      .field('latitude', orphanage.latitude)
      .field('longitude', orphanage.longitude)
      .field('about', orphanage.about)
      .field('instructions', orphanage.instructions)
      .field('opening_hours', orphanage.opening_hours)
      .field('open_on_weekends', orphanage.open_on_weekends)
      .attach('images', image)
      .set('Authorization', `Bearer ${user.authentication}`);

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('latitude');
    expect(response.body).toHaveProperty('longitude');
    expect(response.body).toHaveProperty('about');
    expect(response.body).toHaveProperty('instructions');
    expect(response.body).toHaveProperty('opening_hours');
    expect(response.body).toHaveProperty('open_on_weekends');
    expect(response.body).toHaveProperty('images');
    expect(response.body).toHaveProperty('id');
  });

  it('should not create an orphanage with invalid information', async () => {
    const userFac = await userFactory({});
    const userService = container.resolve(CreateUsersService);
    const user = await userService.execute(userFac);

    const orphanage = await useOrphanage();
    const response = await request(app)
      .post('/api/v1/orphanages')
      .field('name', orphanage.name)
      .field('longitude', orphanage.longitude)
      .field('about', orphanage.about)
      .field('instructions', orphanage.instructions)
      .field('opening_hours', orphanage.opening_hours)
      .field('open_on_weekends', orphanage.open_on_weekends)
      .attach('images', image)
      .set('Authorization', `Bearer ${user.authentication}`);

    expect(response.status).toBe(400);
  });

  it('should delete orphange with valid id', async () => {
    const userFac = await userFactory({});
    const userService = container.resolve(CreateUsersService);
    const user = await userService.execute(userFac);

    const orphanageFactory = await useOrphanage();
    const createOrphanageService = container.resolve(ICreateOrphanagesService);
    const orphanage = await createOrphanageService.execute({
      about: orphanageFactory.about,
      instructions: orphanageFactory.instructions,
      latitude: Number(orphanageFactory.latitude),
      longitude: Number(orphanageFactory.longitude),
      name: orphanageFactory.name,
      open_on_weekends: orphanageFactory.open_on_weekends,
      opening_hours: orphanageFactory.opening_hours,
      images: [],
      approved: false,
      user: {
        id: user.createUser.id,
      },
    });

    const response = await request(app)
      .delete(`/api/v1/orphanages/${orphanage.id}`)
      .set('Authorization', `Bearer ${user.authentication}`);

    expect(response.status).toBe(204);
  });

  it('should not delete orphange with invalid id', async () => {
    const userFac = await userFactory({});
    const userService = container.resolve(CreateUsersService);
    const user = await userService.execute(userFac);

    const id = 8788;
    const response = await request(app)
      .delete(`/api/v1/orphanages/${id}`)
      .set('Authorization', `Bearer ${user.authentication}`);

    expect(response.status).toBe(400);
  });

  it('should return all registered orphanages', async () => {
    const userFac = await userFactory({});
    const userService = container.resolve(CreateUsersService);
    const user = await userService.execute(userFac);

    const orphanageFactory = await useOrphanage();
    const createOrphanageService = container.resolve(ICreateOrphanagesService);
    await createOrphanageService.execute({
      about: orphanageFactory.about,
      instructions: orphanageFactory.instructions,
      latitude: Number(orphanageFactory.latitude),
      longitude: Number(orphanageFactory.longitude),
      name: orphanageFactory.name,
      open_on_weekends: orphanageFactory.open_on_weekends,
      opening_hours: orphanageFactory.opening_hours,
      approved: true,
      images: [],
      user: {
        id: user.createUser.id,
      },
    });

    const response = await request(app).get('/api/v1/orphanages');

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
  });

  it('should return orphanage with valid id', async () => {
    const userFac = await userFactory({});
    const userService = container.resolve(CreateUsersService);
    const user = await userService.execute(userFac);

    const orphanageFactory = await useOrphanage();
    const createOrphanageService = container.resolve(ICreateOrphanagesService);
    const orphanage = await createOrphanageService.execute({
      about: orphanageFactory.about,
      instructions: orphanageFactory.instructions,
      latitude: Number(orphanageFactory.latitude),
      longitude: Number(orphanageFactory.longitude),
      name: orphanageFactory.name,
      open_on_weekends: orphanageFactory.open_on_weekends,
      opening_hours: orphanageFactory.opening_hours,
      approved: true,
      images: [],
      user: {
        id: user.createUser.id,
      },
    });

    const response = await request(app).get(
      `/api/v1/orphanages/${orphanage.id}`,
    );

    expect(response.status).toBe(200);
  });

  it('should return data from orphanage with valid id', async () => {
    const userFac = await userFactory({});
    const userService = container.resolve(CreateUsersService);
    const user = await userService.execute(userFac);

    const orphanageFactory = await useOrphanage();
    const createOrphanageService = container.resolve(ICreateOrphanagesService);
    const orphanage = await createOrphanageService.execute({
      about: orphanageFactory.about,
      instructions: orphanageFactory.instructions,
      latitude: Number(orphanageFactory.latitude),
      longitude: Number(orphanageFactory.longitude),
      name: orphanageFactory.name,
      open_on_weekends: orphanageFactory.open_on_weekends,
      opening_hours: orphanageFactory.opening_hours,
      approved: true,
      images: [],
      user: {
        id: user.createUser.id,
      },
    });

    const response = await request(app).get(
      `/api/v1/orphanages/${orphanage.id}`,
    );

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('latitude');
    expect(response.body).toHaveProperty('longitude');
    expect(response.body).toHaveProperty('about');
    expect(response.body).toHaveProperty('instructions');
    expect(response.body).toHaveProperty('opening_hours');
    expect(response.body).toHaveProperty('open_on_weekends');
    expect(response.body).toHaveProperty('images');
  });

  it('should not return data from orphanage with invalid id', async () => {
    const id = 15472;
    const response = await request(app).get(`/api/v1/orphanages/${id}`);

    expect(response.status).toBe(400);
  });

  it('should not delete an orphanage with invalid path image', async () => {
    const userFac = await userFactory({});
    const userService = container.resolve(CreateUsersService);
    const user = await userService.execute(userFac);

    const orphanageFactory = await useOrphanage();
    const createOrphanageService = container.resolve(ICreateOrphanagesService);
    const orphanage = await createOrphanageService.execute({
      about: orphanageFactory.about,
      instructions: orphanageFactory.instructions,
      latitude: Number(orphanageFactory.latitude),
      longitude: Number(orphanageFactory.longitude),
      name: orphanageFactory.name,
      open_on_weekends: orphanageFactory.open_on_weekends,
      opening_hours: orphanageFactory.opening_hours,
      images: [
        {
          path: '1414541.jpg',
        },
      ],
      approved: true,
      user: {
        id: user.createUser.id,
      },
    });

    const response = await request(app)
      .delete(`/api/v1/orphanages/${orphanage.id}`)
      .set('Authorization', `Bearer ${user.authentication}`);

    expect(response.status).toBe(400);
  });

  it('should delete an orphanage with valid path image', async () => {
    const userFac = await userFactory({});
    const userService = container.resolve(CreateUsersService);
    const user = await userService.execute(userFac);

    const orphanageFactory = await useOrphanage();
    const imageReturn = await request(app)
      .post('/api/v1/orphanages')
      .field('name', orphanageFactory.name)
      .field('latitude', orphanageFactory.latitude)
      .field('longitude', orphanageFactory.longitude)
      .field('about', orphanageFactory.about)
      .field('instructions', orphanageFactory.instructions)
      .field('opening_hours', orphanageFactory.opening_hours)
      .field('open_on_weekends', orphanageFactory.open_on_weekends)
      .field('approved', orphanageFactory.approved)
      .attach('images', image)
      .set('Authorization', `Bearer ${user.authentication}`);

    const createOrphanageService = container.resolve(ICreateOrphanagesService);
    const orphanage = await createOrphanageService.execute({
      about: orphanageFactory.about,
      instructions: orphanageFactory.instructions,
      latitude: Number(orphanageFactory.latitude),
      longitude: Number(orphanageFactory.longitude),
      name: orphanageFactory.name,
      open_on_weekends: orphanageFactory.open_on_weekends,
      opening_hours: orphanageFactory.opening_hours,
      approved: true,
      images: [
        {
          path: imageReturn.body.images[0].path,
        },
      ],
      user: {
        id: user.createUser.id,
      },
    });

    const response = await request(app)
      .delete(`/api/v1/orphanages/${orphanage.id}`)
      .set('Authorization', `Bearer ${user.authentication}`);

    expect(response.status).toBe(204);
  });

  it('should delete the orphanage only if you own it', async () => {
    const userFac = await userFactory({});
    const userService = container.resolve(CreateUsersService);
    const user = await userService.execute(userFac);

    const userFac2 = await userFactory({});
    const userService2 = container.resolve(CreateUsersService);
    const user2 = await userService2.execute(userFac2);

    const orphanageFactory = await useOrphanage();
    const createOrphanageService = container.resolve(ICreateOrphanagesService);
    const orphanage = await createOrphanageService.execute({
      about: orphanageFactory.about,
      instructions: orphanageFactory.instructions,
      latitude: Number(orphanageFactory.latitude),
      longitude: Number(orphanageFactory.longitude),
      name: orphanageFactory.name,
      open_on_weekends: orphanageFactory.open_on_weekends,
      opening_hours: orphanageFactory.opening_hours,
      images: [],
      approved: false,
      user: {
        id: user.createUser.id,
      },
    });

    const response = await request(app)
      .delete(`/api/v1/orphanages/${orphanage.id}`)
      .set('Authorization', `Bearer ${user2.authentication}`);

    expect(response.status).toBe(400);
  });
});
