import { Request, Response, Express } from 'express';
import { container } from 'tsyringe';
import FindAllService from '../../../services/FindAllService';
import FindByIdService from '../../../services/FindByIdService';
import ICreateOrphanagesService from '../../../services/ICreateOrphanagesService';
import orphanageView from '../views/orphanages_view';

class OrphanagesController {
  show = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;

    const orphanageService = container.resolve(FindByIdService);
    const orphanage = await orphanageService.execute(id);

    return response.json(orphanageView.render(orphanage));
  };

  index = async (request: Request, response: Response): Promise<Response> => {
    const findOrphanages = container.resolve(FindAllService);
    const allOrphanages = await findOrphanages.execute();

    return response.json(orphanageView.renderMany(allOrphanages));
  };

  create = async (request: Request, response: Response): Promise<Response> => {
    const {
      name,
      longitude,
      latitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename };
    });

    const createOrphanage = container.resolve(ICreateOrphanagesService);
    const orphanage = await createOrphanage.execute({
      about,
      instructions,
      latitude,
      longitude,
      name,
      open_on_weekends: open_on_weekends === 'true',
      opening_hours,
      images,
    });

    return response.json(orphanage);
  };
}

export default OrphanagesController;
