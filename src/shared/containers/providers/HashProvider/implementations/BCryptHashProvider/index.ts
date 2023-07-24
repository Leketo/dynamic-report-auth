import IHashProvider from '../../models/IHashProvider';
import { hash, compare } from 'bcrypt';

export default class BCryptHashProvider implements IHashProvider {
  generateHash(data: string): Promise<string> {
    return hash(data, 10);
  }
  compareHash(data: string, dataHashed: string): Promise<boolean> {
    return compare(data, dataHashed);
  }
}
