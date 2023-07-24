import { Request, Response } from 'express';

export default interface IAuthenticationControllerRepository {
  login(req: Request, res: Response): Promise<Response>;
}
