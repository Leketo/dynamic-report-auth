import IRequestSchemaValidator from '@shared/containers/providers/RequestValidatorProvider/models/IRequestSchemaValidator';
import IRequestValidatorProvider, {
  IRequestValidate
} from '@shared/containers/providers/RequestValidatorProvider/models/IRequestValidatorProvider';
import { NextFunction, Router } from 'express';
import { container, inject, injectable } from 'tsyringe';
import TokenDecodedMiddleware from '../../middlewares/TokenDecode';
import AuthenticationControllerRepository from '../controllers/implementations/AuthenticationControllerRepository';

@injectable()
export default class AuthenticationsRoutes {
  private verifiedToken: TokenDecodedMiddleware;
  constructor(
    @inject('RequestValidatorProvider')
    private requestValidatorProvider: IRequestValidatorProvider
  ) {
    this.verifiedToken = new TokenDecodedMiddleware();
  }

  private async _validateRequest(
    data: IRequestValidate,
    keyValidate: keyof IRequestSchemaValidator,
    next: (data?: any) => any
  ) {
    try {
      console.log(data, { keyValidate });
      console.log({ keyValidate });

      await this.requestValidatorProvider.validateRequest(data, { keyValidate });
      next();
    } catch (error) {
      next(error);
    }
  }
  private _registerRouters() {
    const router = Router();
    router.post(
      '/v1/auth/login',
      (req, _, next: NextFunction) => this._validateRequest({ body: req.body }, 'login', next),
      (req, res) => container.resolve(AuthenticationControllerRepository).login(req, res)
    );

    router.get('/users', this.verifiedToken.verifiedToken, (req, res) =>
      container.resolve(AuthenticationControllerRepository).getByAll(req, res)
    );

    router.get(
      '/users/:user_id',
      this.verifiedToken.verifiedToken,
      (req, _, next: NextFunction) => this._validateRequest({ params: req.params }, 'findUserAdminById', next),
      (req, res) => container.resolve(AuthenticationControllerRepository).getById(req, res)
    );

    return router;
  }

  register(router: Router) {
    router.use('/api-hub', this._registerRouters());
  }
}
