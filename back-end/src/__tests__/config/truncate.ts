import { getConnection } from 'typeorm';

const truncate = async () => {
  getConnection().entityMetadatas.map(entity => {
    return getConnection().getRepository(entity.name).delete({});
  });
};

export default truncate;
