import Joi from 'joi';
import IRequestSchemaValidator from '../../models/IRequestSchemaValidator';
import { IRequestValidate } from '../../models/IRequestValidatorProvider';

export default class JoiSchemaValidator implements IRequestSchemaValidator {
  login(): IRequestValidate {
    return {
      body: {
        user: Joi.string().required(),
        password: Joi.string().required()
      }
    };
  }

  findUserAdminById(): IRequestValidate {
    return {
      params: {
        user_id: Joi.number().required()
      }
    };
  }
}
