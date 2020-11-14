import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';
import connection from '@shared/infra/typeorm';

import ErrorHandle from '@shared/errors/ErrorHandle';
import routes from './routes';

class App {
  public app: express.Application;

  constructor() {
    connection();
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares = async () => {
    this.app.use(express.json());
    this.app.use(cors());
  };

  private routes = () => {
    this.app.use('/api/v1', routes);
    this.app.use(
      '/uploads',
      express.static(path.join(__dirname, '..', '..', '..', '..', '/uploads')),
    );
    this.app.use(ErrorHandle);
  };
}

export default new App().app;
