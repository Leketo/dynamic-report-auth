import { ICreateKeyPairDTO } from '../dtos/ICreateKeyPairDTO';
import { IDecryptDTO } from '../dtos/IDecryptDTO';
import { IEncryptDTO } from '../dtos/IEncryptDTO';
import IEncryptedByKeysDTO from '../dtos/IEncryptedByKeysDTO';

export default interface IEncryptDataProvider {
  createKeyPair(): Promise<ICreateKeyPairDTO>;
  randomPassphrase(length: number): Promise<string>;
  encrypt(params: IEncryptDTO): Buffer;
  decrypt(params: IDecryptDTO): Buffer;
  encryptedByKeys<T>(params: IEncryptedByKeysDTO<T>): T;
}
