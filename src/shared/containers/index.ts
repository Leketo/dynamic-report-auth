import { container } from 'tsyringe';

import './providers';
import ILoginRepository from '@admin/repositories/ILoginRepository';
import LoginRepository from '@admin/infra/sequelize/repositories/LoginRepository';

container.registerSingleton<ILoginRepository>('LoginRepository', LoginRepository);
