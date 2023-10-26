const { Client, Pool } = require('pg');
import IDatasource from '../models/IDatasource';

/*const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbPortString = process.env.DB_PORT || '5432';
const dbPort = parseInt(dbPortString, 10);*/

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || '5432',
  database: process.env.DB_NAME
});

interface IParamsQuery {
  body?: any;
  context?: IContextData;
}

export default class DatabaseSourcePg implements IDatasource {
  up(): any {
    try {
      return pool.query('SELECT NOW()');
    } catch (error) {
      console.error('Error connecting to PostgreSQL v8:', error);
    }
  }

  static async query<T>(queryString: string, options?: IParamsQuery): Promise<T> {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(queryString, options?.body);
      return rows;
    } finally {
      client.release();
    }
  }
}
