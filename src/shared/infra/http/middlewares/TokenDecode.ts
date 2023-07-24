import JsonWebTokenProvider from '@shared/containers/providers/TokenProvider/implementations/JsonWebTokenProvider';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
const fs = require('fs');

interface ITokenPayload {
  id_user: string;
  rol_name: string;
}
export default class TokenDecodedMiddleware {
  async verifiedToken(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError({
        statusCode: 401,
        errorCode: 'A5000',
        message: 'Authorization is missing'
      });
    }

    const token = authorization.split(' ')[1];
    try {
      const public_key = fs.readFileSync('./public.key', 'utf8');
      const connect = container.resolve(JsonWebTokenProvider);
      const { id_user, rol_name } = await connect.verify<ITokenPayload>({
        token,
        public_key: public_key as string
      });

      req.context = {
        id_user,
        rol_name
      };
      next();
    } catch (error) {
      throw new AppError({
        statusCode: 401,
        errorCode: 'A5000',
        message: 'Invalid Token'
      });
    }
  }
}
