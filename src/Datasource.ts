import DatabaseSourcePg from '@shared/infra/db/pg';
import DatabaseSourceSequelize from '@shared/infra/db/sequelize';

export default class DataSource {
  async start(): Promise<any> {
    //  return new DatabaseSourceSequelize().up();
    return new DatabaseSourcePg().up();
  }
}
