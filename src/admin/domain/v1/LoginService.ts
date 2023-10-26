import ILoginRepository, { ILoginResponse } from '@admin/repositories/ILoginRepository';
import IEncryptDataProvider from '@shared/containers/providers/EncryptDataProvider/models/IEncryptDataProvider';
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

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider
  ) {}

  async execute({ user, password }: IRequest): Promise<
    | {
        id: string;
        username: string;
        description: string;
        token: string;
        role: string;
      }
    | AppError
  > {
    const private_key = fs.readFileSync('./private.key', 'utf8');
    const response = await this.loginRepository.login<ILoginResponse>({
      user,
      password
    });
    if (response instanceof AppError) return response;

    // Usar los datos de la respuesta del Repository para generar el token y respuesta final
    const resData = {
      id_user: response.data.id_user,
      rol_name: response.data.report_permission === 1 ? 'Admin' : 'User'
    };

    const token = this.tokenProvider.sign({ data: resData, secret_key: private_key as string });

    return {
      id: resData.id_user,
      username: user,
      token,
      description: response.data.description,
      role: resData.rol_name
    };
  }
}
