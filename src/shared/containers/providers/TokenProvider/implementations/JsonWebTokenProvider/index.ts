import ISignDTO from '../../dtos/ISignDTO';
import IVerifyDTO from '../../dtos/IVerifyDTO';
import ITokenProvider from '../../models/ITokenProvider';
import { sign as signJWT, verify as verifyJWT } from 'jsonwebtoken';

export default class JsonWebTokenProvider implements ITokenProvider {
  sign({ data, secret_key, expires_in = '1h' }: ISignDTO): string {
    return signJWT(data, secret_key.replace(/\\n/g, '\n').replace(/\\s/g, ' '), {
      algorithm: 'RS256',
      expiresIn: expires_in
    });
  }
  verify<T>({ token, public_key }: IVerifyDTO): T {
    return verifyJWT(token, public_key.replace(/\\n/g, '\n').replace(/\\s/g, ' ')) as T;
  }
}
