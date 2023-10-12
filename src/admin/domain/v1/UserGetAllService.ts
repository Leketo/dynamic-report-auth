import ILoginRepository, { ILoginResponse } from '@admin/repositories/ILoginRepository';
import IEncryptDataProvider from '@shared/containers/providers/EncryptDataProvider/models/IEncryptDataProvider';
import IHashProvider from '@shared/containers/providers/HashProvider/models/IHashProvider';
import ITokenProvider from '@shared/containers/providers/TokenProvider/models/ITokenProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
const fs = require('fs');

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
export default class UserGetAllService {
  constructor(
    @inject('LoginRepository')
    private loginRepository: ILoginRepository,

    @inject('EncryptDataProvider')
    private encryptDataProvider: IEncryptDataProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider
  ) {}

  async execute(): Promise<IResponse[] | AppError> {
    const responses: IResponse[] = [
      {
        id: 1, // Convertimos user_id a cadena
        username: 'ejemplo1',
        firstName: 'Nombre1',
        token: 'token-de-ejemplo1',
        role: 'Rol1',
        lastName: 'Apellido1'
      },
      {
        id: 2, // Personalizamos el segundo elemento
        username: 'ejemplo2',
        firstName: 'Nombre2',
        token: 'token-de-ejemplo2',
        role: 'Rol2',
        lastName: 'Apellido2'
      },
      {
        id: 3, // Personalizamos el tercer elemento
        username: 'ejemplo3',
        firstName: 'Nombre3',
        token: 'token-de-ejemplo3',
        role: 'Rol3',
        lastName: 'Apellido3'
      }
    ];

    return responses;
  }
}
