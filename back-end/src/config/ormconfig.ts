import path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSERNAME,
  password: () => process.env.PGPASS,
  database: process.env.PGDATABASE,
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
