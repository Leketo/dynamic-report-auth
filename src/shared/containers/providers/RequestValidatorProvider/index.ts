import { container } from 'tsyringe';
import JoiRequestValidator from './implementations/Joi/JoiRequestValidator';
import IRequestValidatorProvider from './models/IRequestValidatorProvider';

const providers = {
  joi: {
    implementation: JoiRequestValidator
  }
};

container.registerSingleton<IRequestValidatorProvider>('RequestValidatorProvider', providers.joi.implementation);
