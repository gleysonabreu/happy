import fs from 'fs';
import path from 'path';

const truncateImages = async () => {
  const folder = path.join(__dirname, '..', '..', '..', 'uploads');
  fs.readdirSync(folder).forEach(file => {
    if (file !== 'baixados.png') fs.unlinkSync(path.resolve(folder, file));
  });
};

export default truncateImages;
