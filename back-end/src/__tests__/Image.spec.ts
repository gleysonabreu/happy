import request from 'supertest';
import connection from '@shared/infra/typeorm';
import path from 'path';
import app from '../shared/infra/http/app';
import truncate from './config/truncate';
import { useOrphanage } from './config/factories';
import truncateImages from './config/truncate_images';

const image = path.join(__dirname, '..', '..', 'uploads', 'baixados.png');

describe('Images Orphanage', () => {
  beforeAll(async () => {
    await connection();
  });

  beforeEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    await truncateImages();
  });

  it('should delete image with valid id', async () => {
    const orphanageFactory = await useOrphanage();
    const resOrphanage = await request(app)
      .post('/api/v1/orphanages')
      .field('name', orphanageFactory.name)
      .field('latitude', orphanageFactory.latitude)
      .field('longitude', orphanageFactory.longitude)
      .field('about', orphanageFactory.about)
      .field('instructions', orphanageFactory.instructions)
      .field('opening_hours', orphanageFactory.opening_hours)
      .field('open_on_weekends', orphanageFactory.open_on_weekends)
      .attach('images', image);
    const { images } = resOrphanage.body;

    const response = await request(app).delete(
      `/api/v1/orphanages/image/${images[0].id}`,
    );

    expect(response.status).toBe(204);
  });

  it('should not delete image with invalid id', async () => {
    const id = 5784578;
    const response = await request(app).delete(
      `'/api/v1/orphanages/image/${id}`,
    );

    expect(response.status).toBe(400);
  });
});
