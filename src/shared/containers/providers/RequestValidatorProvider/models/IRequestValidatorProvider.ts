import IRequestSchemaValidator from './IRequestSchemaValidator';

export interface IRequestValidate {
  body?: object;
  params?: object;
  query?: object;
  headers?: object;
  cookies?: object;
  signedCookies?: object;
}

export interface IRequestSchemaValidatorOption {
  keyValidate: keyof IRequestSchemaValidator;
}

export default interface IRequestValidatorProvider {
  validateRequest(request: IRequestValidate, options: IRequestSchemaValidatorOption): Promise<any>;
}
