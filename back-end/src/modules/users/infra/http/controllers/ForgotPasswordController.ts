import ChangePasswordService from '@modules/users/services/ChangePasswordService';
import ValidationForgotPasswordService from '@modules/users/services/ValidationForgotPasswordService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ForgotPasswordService from '../../../services/ForgotPasswordService';

class ForgotPasswordController {
  changePassword = async (request: Request, response: Response) => {
    const { newPassword, repeatNewPassword, token } = request.body;

    const changePasswordService = container.resolve(ChangePasswordService);
    await changePasswordService.execute({
      newPassword,
      repeatNewPassword,
      token,
    });

    return response.status(204).send();
  };

  forgotPassword = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { email } = request.body;

    const forgotService = container.resolve(ForgotPasswordService);
    await forgotService.execute({ email });

    return response.status(204).send();
  };

  forgotValidateToken = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { forgot_password_token } = request.query;

    const validationForgotPasswordService = container.resolve(
      ValidationForgotPasswordService,
    );

    await validationForgotPasswordService.execute(
      String(forgot_password_token),
    );

    return response.status(204).send();
  };
}

export default ForgotPasswordController;
