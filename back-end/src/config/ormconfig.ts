import path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '32841516',
  database: 'nlw3',
  synchronize: true,
  logging: false,
  entities: [
    path.join(
      __dirname,
      '..',
      'modules',
      '**',
      'infra',
      'typeorm',
      'entities',
      '*.ts',
    ),
  ],
  migrations: [
    path.join(
      __dirname,
      '..',
      'shared',
      'infra',
      'typeorm',
      'migrations',
      '*.ts',
    ),
  ],
  cli: {
    entitiesDir: '',
    migrationsDir: path.join(
      __dirname,
      '..',
      'shared',
      'infra',
      'typeorm',
      'migrations',
    ),
  },
};

export default ormConfig;
