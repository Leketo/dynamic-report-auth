import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IAuthenticationControllerRepository from '../IAuthenticationControllerRepository';
import LoginService from '@admin/domain/v1/LoginService';

export default class AuthenticationControllerRepository implements IAuthenticationControllerRepository {
  async status(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ ok: '200' });
  }
  async login(req: Request, res: Response): Promise<Response> {
    const { user, password } = req.body;

    const connect = container.resolve(LoginService);
    const merchant = await connect.execute({ user, password });

    return res.status(200).json(merchant);
  }
}
