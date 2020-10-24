import request from 'supertest';
import createConnection from '@shared/infra/typeorm';
import path from 'path';
import { container } from 'tsyringe';
import ICreateOrphanagesService from '@modules/orphanages/services/ICreateOrphanagesService';
import { Connection, getConnection } from 'typeorm';
import app from '../shared/infra/http/app';
import truncate from './config/truncate';
import { useOrphanage } from './config/factories';
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

  it('should create a orphanage with valid information', async () => {
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
      .attach('images', image);

    expect(response.status).toBe(200);
  });

  it('should return orphanage data', async () => {
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
      .attach('images', image);

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
    const orphanage = await useOrphanage();
    const response = await request(app)
      .post('/api/v1/orphanages')
      .field('name', orphanage.name)
      .field('longitude', orphanage.longitude)
      .field('about', orphanage.about)
      .field('instructions', orphanage.instructions)
      .field('opening_hours', orphanage.opening_hours)
      .field('open_on_weekends', orphanage.open_on_weekends)
      .attach('images', image);

    expect(response.status).toBe(400);
  });

  it('should delete orphange with valid id', async () => {
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
    });

    const response = await request(app).delete(
      `/api/v1/orphanages/${orphanage.id}`,
    );

    expect(response.status).toBe(204);
  });

  it('should not delete orphange with invalid id', async () => {
    const id = 8788;
    const response = await request(app).delete(`/api/v1/orphanages/${id}`);

    expect(response.status).toBe(400);
  });

  it('should return all registered orphanages', async () => {
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
      images: [],
    });

    const response = await request(app).get('/api/v1/orphanages');

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
  });

  it('should return orphanage with valid id', async () => {
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
    });

    const response = await request(app).get(
      `/api/v1/orphanages/${orphanage.id}`,
    );

    expect(response.status).toBe(200);
  });

  it('should return data from orphanage with valid id', async () => {
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
    });

    const response = await request(app).delete(
      `/api/v1/orphanages/${orphanage.id}`,
    );

    expect(response.status).toBe(400);
  });

  it('should delete an orphanage with valid path image', async () => {
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
      .attach('images', image);

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
          path: imageReturn.body.images[0].path,
        },
      ],
    });

    const response = await request(app).delete(
      `/api/v1/orphanages/${orphanage.id}`,
    );

    expect(response.status).toBe(204);
  });
});
