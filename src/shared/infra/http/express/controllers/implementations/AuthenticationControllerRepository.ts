import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IAuthenticationControllerRepository from '../IAuthenticationControllerRepository';
import LoginService from '@admin/domain/v1/LoginService';
import UserGetByIdService from '@admin/domain/v1/UserGetByIdService';
import UserGetAllService from '@admin/domain/v1/UserGetAllService';

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

  async getById(req: Request, res: Response): Promise<Response> {
    const user_id = parseInt(req.params.user_id, 10); // Convierte user_id a número entero

    const connect = container.resolve(UserGetByIdService);
    const merchant = await connect.execute(user_id);

    return res.status(200).json(merchant);
  }

  async getByAll(req: Request, res: Response): Promise<Response> {
    const connect = container.resolve(UserGetAllService);
    const merchant = await connect.execute();

    return res.status(200).json(merchant);
  }
}
