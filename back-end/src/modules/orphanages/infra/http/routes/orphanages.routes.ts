import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import OrphanagesController from '../controllers/OrphanagesController';

const orphanagesRouter = Router();
const orphanagesController = new OrphanagesController();
const upload = multer(uploadConfig);

orphanagesRouter.get('/', orphanagesController.index);
orphanagesRouter.get('/:id', orphanagesController.show);
orphanagesRouter.post('/', upload.array('images'), orphanagesController.create);

export default orphanagesRouter;
