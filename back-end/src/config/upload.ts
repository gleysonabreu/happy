import multer from 'multer';
import path from 'path';
import crypt from 'crypto';

export const folder = path.join(__dirname, '..', '..', 'uploads');

export default {
  storage: multer.diskStorage({
    destination: folder,
    filename: (request, file, cb) => {
      const fieldHash = crypt.randomBytes(10).toString('hex');
      const filename = `${fieldHash}-${Date.now()}-${file.originalname}`;

      cb(null, filename);
    },
  }),
};
