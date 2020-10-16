import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUsersService from '../../../services/CreateUsersService';
import usersView from '../views/users.view';

class UsersController {
  create = async (request: Request, response: Response): Promise<Response> => {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUsersService);
    const user = await createUserService.execute({ name, email, password });

    return response.json(usersView.render(user));
  };
}

export default UsersController;
