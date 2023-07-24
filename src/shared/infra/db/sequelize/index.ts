import IDatasource from '../models/IDatasource';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes, Transaction } from 'sequelize';
import isEmpty from 'is-empty';

//IMPORT MODELS

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbDriver = 'postgres';
const dbPassword = process.env.DB_PASSWORD;
const dbModels: any[] = [];
const dbPortString = process.env.DB_PORT || '5432';
const dbPort = parseInt(dbPortString, 10);

interface IParamsQuery {
  body?: any;
  transaction?: Transaction;
  context?: IContextData;
}

export default class DatabaseSourceSequelize implements IDatasource {
  static connection: Sequelize;
  up(): any {
    if (!DatabaseSourceSequelize.connection) {
      try {
        DatabaseSourceSequelize.connection = new Sequelize({
          database: dbName,
          username: dbUser,
          password: dbPassword,
          host: dbHost,
          port: dbPort,
          dialect: dbDriver,
          models: dbModels
        });
        return DatabaseSourceSequelize.connection.authenticate();
      } catch (error) {
        console.log('error::', error);
      }
    }
  }

  static async verifyContext(context: IContextData | undefined) {
    if (!!context && !isEmpty(context)) {
      const paramsContextJSON = {
        params: JSON.stringify({ id_user: context?.id_user, rol_name: context?.rol_name })
      };

      await DatabaseSourceSequelize.query<Array<{ proc_set_data_in_context: any }>>(
        'SELECT utils.proc_set_data_in_context(:params)',
        { body: paramsContextJSON }
      );
    }
  }
  static async query<T>(queryString: string, options?: IParamsQuery): Promise<T> {
    await DatabaseSourceSequelize.verifyContext(options?.context);

    return (await DatabaseSourceSequelize.connection.query(`${queryString}`, {
      replacements: options?.body,
      transaction: options?.transaction,
      type: QueryTypes.SELECT
    })) as T;
  }
}
