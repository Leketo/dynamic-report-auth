import { ILoginDTO } from '@admin/dtos/ILoginDTO';
import AppError from '@shared/errors/AppError';

export interface IResponseRepositorySP<T> {
  code: string;
  message: string;
  data: T;
}

export interface ILoginResponse {
  id_user: string;
  rol: number;
  password: string;
}

export default interface ILoginRepository {
  login<T>(params: ILoginDTO): Promise<IResponseRepositorySP<ILoginResponse | AppError>>;
}
