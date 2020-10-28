import { Router } from 'express';
import middlewareAuth from '@shared/infra/http/middlewares/auth';
import UsersController from '../controllers/UsersController';

const usersRoute = Router();
const usersController = new UsersController();

usersRoute.post('/', usersController.create);
usersRoute.get('/', [middlewareAuth], usersController.show);

export default usersRoute;
