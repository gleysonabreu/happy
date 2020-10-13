import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares = () => {
    this.app.use(express.json());
  };

  private routes = () => {};
}

export default new App().app;
