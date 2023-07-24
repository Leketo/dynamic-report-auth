import joi from 'joi';
import AppError from '@shared/errors/AppError';
import IRequestValidatorProvider, {
  IRequestSchemaValidatorOption,
  IRequestValidate
} from '../../models/IRequestValidatorProvider';
import JoiSchemaValidator from './JoiSchemaValidator';

export default class JoiRequestValidator implements IRequestValidatorProvider {
  async validateRequest(data: IRequestValidate, options: IRequestSchemaValidatorOption): Promise<any> {
    const joiSchemaValidator = new JoiSchemaValidator();
    return this._validate(data, joiSchemaValidator[options.keyValidate]);
  }

  private async _validate(data: IRequestValidate, schemaValidation: () => object): Promise<any> {
    const schema = joi.object().keys(schemaValidation());
    try {
      await schema.validateAsync(data);
    } catch (error) {
      console.log('joi', error);
      throw new AppError({ message: 'Invalid params', errorCode: 'A0001', data: error, statusCode: 403 });
    }
  }
}
