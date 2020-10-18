import { createConnection } from 'typeorm';
import ormConfig from '@config/ormconfig';

const connection = () => createConnection(ormConfig);

export default connection;
