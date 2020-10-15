import DeleteImageService from '@modules/orphanages/services/DeleteImageService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ImageController {
  delete = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;

    const deleteImageService = container.resolve(DeleteImageService);
    await deleteImageService.execute(Number(id));

    return response.status(204).send();
  };
}

export default ImageController;
