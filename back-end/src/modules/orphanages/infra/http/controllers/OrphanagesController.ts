import DeleteOrphanageService from '@modules/orphanages/services/DeleteOrphanageService';
import UpdateOrphanageService from '@modules/orphanages/services/UpdateOrphanageService';
import { Request, Response, Express } from 'express';
import { container } from 'tsyringe';
import FindAllService from '../../../services/FindAllService';
import FindByIdService from '../../../services/FindByIdService';
import ICreateOrphanagesService from '../../../services/ICreateOrphanagesService';
import orphanageView from '../views/orphanages_view';

class OrphanagesController {
  update = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;

    const updateOrphanageService = container.resolve(UpdateOrphanageService);
    await updateOrphanageService.execute(id, request.userId);

    return response.status(204).send();
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;

    const deleteOrpanageService = container.resolve(DeleteOrphanageService);
    await deleteOrpanageService.execute(id, request.userId);

    return response.status(204).send();
  };

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
      approved,
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
      user: {
        id: request.userId,
      },
      approved: approved === 'true',
    });

    return response.json(orphanage);
  };
}

export default OrphanagesController;
