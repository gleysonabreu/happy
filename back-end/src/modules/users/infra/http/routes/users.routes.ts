import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersRoute = Router();
const usersController = new UsersController();

usersRoute.post('/', usersController.create);
usersRoute.get('/:id', usersController.show);

export default usersRoute;
