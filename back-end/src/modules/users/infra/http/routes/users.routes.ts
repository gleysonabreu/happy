import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersRoute = Router();
const usersController = new UsersController();

usersRoute.post('/', usersController.create);

export default usersRoute;
