import { Sequelize } from 'sequelize-typescript';
import {
  LEAD_DATABASE,
  SALES_CLIENT_REPOSITORY,
  SALES_LEAD_REPOSITORY,
  SALES_OWNER_REPOSITORY,
} from '../leads/constants';
import { SalesLead } from '../leads/entity/lead.entity';
import { SalesClient } from './entity/client.entity';
import { SalesOwner } from './entity/owner.entity';
import clients from '../leads/config/clients.json';
import owners from '../leads/config/owners.json';
import leads from '../leads/config/leads.json';

const POSTGRES_DIALECT = 'postgres';
const OPTIONS = {
  charset: 'utf8',
  collate: 'utf8_general_ci',
};

export const databaseProviders = [
  {
    provide: SALES_LEAD_REPOSITORY,
    useValue: SalesLead,
  },
  {
    provide: SALES_OWNER_REPOSITORY,
    useValue: SalesOwner,
  },
  {
    provide: SALES_CLIENT_REPOSITORY,
    useValue: SalesClient,
  },
  {
    provide: LEAD_DATABASE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: POSTGRES_DIALECT,
        host: process.env.DB_HOST,
        port: Number.parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        define: OPTIONS,
      });
      sequelize.addModels([SalesClient, SalesLead, SalesOwner]);

      await Promise.resolve(sequelize.authenticate());
      await Promise.resolve(sequelize.sync({ force: true }));
      // Create initial dataset adding clients, owners and leads
      await Promise.allSettled([
        SalesClient.bulkCreate(clients),
        SalesOwner.bulkCreate(owners),
      ]);
      await SalesLead.bulkCreate(leads);
      // Alter auto-increment id for post so that inserts begin with this correct id
      await Promise.allSettled([
        sequelize.query(
          `ALTER SEQUENCE sales_owners_id_seq RESTART WITH ${owners.length +
            1};`,
        ),
        sequelize.query(
          `ALTER SEQUENCE sales_clients_id_seq RESTART WITH ${clients.length +
            1}`,
        ),
        sequelize.query(
          `ALTER SEQUENCE sales_leads_id_seq RESTART WITH ${leads.length + 1}`,
        ),
      ]);
      return sequelize;
    },
  },
];
