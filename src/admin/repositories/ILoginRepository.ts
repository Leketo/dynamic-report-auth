import { ILoginDTO } from '@admin/dtos/ILoginDTO';
import AppError from '@shared/errors/AppError';

export interface IResponseRepositorySP<T> {
  code: string;
  message: string;
  data: T;
}

export interface ILoginResponse {
  id_user: string;
  password: string;
  report_permission: number;
  description: string;
}

export default interface ILoginRepository {
  login<T>(params: ILoginDTO): Promise<IResponseRepositorySP<ILoginResponse | AppError>>;
}
