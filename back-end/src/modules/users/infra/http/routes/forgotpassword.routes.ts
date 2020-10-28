import { Router } from 'express';
import ForgorPasswordController from '../controllers/ForgotPasswordController';

const forgorPasswordRoutes = Router();
const forgorPasswordController = new ForgorPasswordController();

forgorPasswordRoutes.post('/', forgorPasswordController.forgotPassword);
forgorPasswordRoutes.get(
  '/validation',
  forgorPasswordController.forgotValidateToken,
);
forgorPasswordRoutes.put('/', forgorPasswordController.changePassword);

export default forgorPasswordRoutes;
