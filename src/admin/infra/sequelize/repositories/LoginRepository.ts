import { ILoginDTO } from '@admin/dtos/ILoginDTO';
import ILoginRepository, { ILoginResponse, IResponseRepositorySP } from '@admin/repositories/ILoginRepository';
import AppError from '@shared/errors/AppError';
import DatabaseSourcePg from '@shared/infra/db/pg';

export default class LoginRepository implements ILoginRepository {
  async login<T>({
    user,
    password
  }: ILoginDTO): Promise<any> /*Promise<IResponseRepositorySP<ILoginResponse> | AppError>*/ {
    try {
      const responseQuery = await DatabaseSourcePg.query<Array<ILoginResponse>>(
        `SELECT ad_user_id AS id_user, "password", report_permission, description FROM libertya.ad_user WHERE "name" = $1`,
        {
          body: [user]
        }
      );

      if (!responseQuery || responseQuery.length === 0) {
        throw new AppError({ message: 'User not found', errorCode: 'USER_NOT_FOUND', statusCode: 404 });
      }

      const userData: ILoginResponse = responseQuery[0];

      // Verifica si la contraseña proporcionada coincide con la almacenada
      if (password !== userData.password) {
        throw new AppError({
          message: 'La contraseña ingresada es incorrecta. Por favor, verifica tus datos e inténtalo nuevamente.',
          errorCode: 'INVALID_CREDENTIALS',
          statusCode: 500
        });
      }

      const response: IResponseRepositorySP<ILoginResponse> = {
        code: '200',
        message: 'Login successful',
        data: userData
      };

      return response;
    } catch (error: any) {
      console.log(error);
      throw error;
      //const { code } = error.parent;
      //throw new AppError({ message: error.message, errorCode: code, statusCode: code === '99999' ? 500 : undefined });
    }
  }
}
