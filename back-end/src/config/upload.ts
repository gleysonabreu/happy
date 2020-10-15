import multer from 'multer';
import path from 'path';

export const folder = path.join(__dirname, '..', '..', 'uploads');

export default {
  storage: multer.diskStorage({
    destination: folder,
    filename: (request, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;

      cb(null, filename);
    },
  }),
};
