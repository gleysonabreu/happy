import { Router } from 'express';

import orphanages from '@modules/orphanages/infra/http/routes/orphanages.routes';
import imagesRoute from '@modules/orphanages/infra/http/routes/images.routes';
import usersRoute from '@modules/users/infra/http/routes/users.routes';
import sessionRoutes from '@modules/users/infra/http/routes/session.routes';

const routes = Router();

routes.use('/orphanages', orphanages);
routes.use('/orphanages/image', imagesRoute);
routes.use('/users', usersRoute);
routes.use('/authenticate', sessionRoutes);

export default routes;
