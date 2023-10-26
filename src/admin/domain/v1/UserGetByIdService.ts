import ILoginRepository, { ILoginResponse } from '@admin/repositories/ILoginRepository';
import IEncryptDataProvider from '@shared/containers/providers/EncryptDataProvider/models/IEncryptDataProvider';
import ITokenProvider from '@shared/containers/providers/TokenProvider/models/ITokenProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user: string;
  password: string;
}

interface IResponse {
  id: number;
  username: string;
  firstName: string;
  token: string;
  role: string;
  lastName: string;
}

@injectable()
export default class UserGetByIdService {
  constructor(
    @inject('LoginRepository')
    private loginRepository: ILoginRepository,

    @inject('EncryptDataProvider')
    private encryptDataProvider: IEncryptDataProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider
  ) {}

  async execute(user_id: number): Promise<IResponse | AppError> {
    const response: IResponse = {
      id: user_id,
      username: 'ejemplo',
      firstName: 'Nombre',
      token: 'token-de-ejemplo',
      role: 'Rol',
      lastName: 'Apellido'
    };

    return response;
  }
}
