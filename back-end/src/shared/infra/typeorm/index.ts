import { Connection, createConnection } from 'typeorm';
import ormConfig from '@config/ormconfig';

const connection = async (name = 'default'): Promise<Connection> => {
  return createConnection(
    Object.assign(ormConfig, {
      name,
    }),
  );
};

export default connection;
