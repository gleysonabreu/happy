import { Router } from 'express';
import ImageController from '../controllers/ImagesController';

const imagesRoute = Router();
const imageController = new ImageController();

imagesRoute.delete('/:id', imageController.delete);

export default imagesRoute;
