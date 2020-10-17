import { Router } from 'express';
import ForgorPasswordController from '../controllers/ForgotPasswordController';

const forgorPasswordRoutes = Router();
const forgorPasswordController = new ForgorPasswordController();

forgorPasswordRoutes.get('/', forgorPasswordController.forgotPassword);
forgorPasswordRoutes.get(
  '/validation',
  forgorPasswordController.forgotValidateToken,
);
forgorPasswordRoutes.post('/', forgorPasswordController.changePassword);

export default forgorPasswordRoutes;
