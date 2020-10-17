import LoginService from '@modules/users/services/LoginService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SessionController {
  create = async (request: Request, response: Response): Promise<Response> => {
    const { email, password } = request.body;

    const loginService = container.resolve(LoginService);
    const token = await loginService.execute({ email, password });

    return response.json({ token });
  };
}

export default SessionController;
