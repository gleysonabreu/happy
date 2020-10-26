import { Router } from 'express';
import middlewareAuth from '@shared/infra/http/middlewares/auth';
import ImageController from '../controllers/ImagesController';

const imagesRoute = Router();
const imageController = new ImageController();

imagesRoute.delete('/:id', [middlewareAuth], imageController.delete);

export default imagesRoute;
