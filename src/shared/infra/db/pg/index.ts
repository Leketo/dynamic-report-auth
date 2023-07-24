const { Client } = require('pg');
import IDatasource from '../models/IDatasource';

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbPortString = process.env.DB_PORT || '5432';
const dbPort = parseInt(dbPortString, 10);

interface IParamsQuery {
  body?: any;
  context?: IContextData;
}

export default class DatabaseSourcePg implements IDatasource {
  static client: Client;

  up(): any {
    if (!DatabaseSourcePg.client) {
      try {
        DatabaseSourcePg.client = new Client({
          user: dbUser,
          password: dbPassword,
          host: dbHost,
          port: dbPort,
          database: dbName
        });
        return DatabaseSourcePg.client.connect();
      } catch (error) {
        console.error('Error connecting to PostgreSQL v8:', error);
      }
    }
  }

  static async query<T>(queryString: string, options?: IParamsQuery): Promise<T> {
    const { rows } = await DatabaseSourcePg.client.query<T>(queryString, options?.body);
    return rows;
  }
}
