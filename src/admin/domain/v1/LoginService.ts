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

@injectable()
export default class LoginService {
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

  async execute({ user, password }: IRequest): Promise<
    | {
        id: string;
        username: string;
        firstName: string;
        token: string;
        role: string;
        lastName: string;
      }
    | AppError
  > {
    const private_key = fs.readFileSync('./private.key', 'utf8');
    const response = await this.loginRepository.login<ILoginResponse>({
      user,
      password
    });
    if (response instanceof AppError) return response;

    console.log(response);

    const resData = {
      id_user: response.data.id_user
      //va a tener mas adelante
      // rol_name: response.data.rol
    };

    const token = this.tokenProvider.sign({ data: resData, secret_key: private_key as string });

    const ROLES = {
      User: 2001,
      Editor: 1984,
      Admin: 5150
    };

    return {
      id: '21212',
      username: 'Admin',
      token,
      firstName: 'Jorge',
      lastName: 'Ramirez',
      role: 'Admin'
    };
  }
}
