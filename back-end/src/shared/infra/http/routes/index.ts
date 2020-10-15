import { Router } from 'express';

import orphanages from '@modules/orphanages/infra/http/routes/orphanages.routes';
import imagesRoute from '@modules/orphanages/infra/http/routes/images.routes';

const routes = Router();

routes.use('/orphanages', orphanages);
routes.use('/orphanages/image', imagesRoute);

export default routes;
