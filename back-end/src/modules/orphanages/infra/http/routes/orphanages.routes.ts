import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import middlewareAuth from '@shared/infra/http/middlewares/auth';
import OrphanagesController from '../controllers/OrphanagesController';

const orphanagesRouter = Router();
const orphanagesController = new OrphanagesController();
const upload = multer(uploadConfig);

orphanagesRouter.get('/', orphanagesController.index);
orphanagesRouter.get('/:id', orphanagesController.show);
orphanagesRouter.post(
  '/',
  [middlewareAuth],
  upload.array('images'),
  orphanagesController.create,
);
orphanagesRouter.put('/:id', [middlewareAuth], orphanagesController.update);
orphanagesRouter.delete('/:id', [middlewareAuth], orphanagesController.delete);

export default orphanagesRouter;
