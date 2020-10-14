import { Router } from 'express';

import orphanages from '@modules/orphanages/infra/http/routes/orphanages.routes';

const routes = Router();

routes.use('/orphanages', orphanages);

export default routes;
