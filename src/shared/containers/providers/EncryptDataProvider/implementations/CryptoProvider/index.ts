import { constants, generateKeyPair, privateDecrypt, publicEncrypt, randomBytes } from 'crypto';
import { ICreateKeyPairDTO } from '../../dtos/ICreateKeyPairDTO';
import { IDecryptDTO } from '../../dtos/IDecryptDTO';
import { IEncryptDTO } from '../../dtos/IEncryptDTO';
import IEncryptedByKeysDTO from '../../dtos/IEncryptedByKeysDTO';
import IEncryptDataProvider from '../../models/IEncryptDataProvider';

export default class CryptoProvider implements IEncryptDataProvider {
  encryptedByKeys<T>({ keys, data: objectData, publicKey }: IEncryptedByKeysDTO<T>): T {
    const newObject = {};
    Object.entries(objectData).forEach(([key, value]) => {
      if (keys.includes(key as keyof T)) {
        const dataEncrypted = this.encrypt({ publicKey, data: JSON.stringify(value) });
        Object.assign(newObject, { [key]: dataEncrypted.toString('base64') });
      } else {
        Object.assign(newObject, { [key]: value });
      }
    });
    return newObject as T;
  }

  randomPassphrase(length: number = 48): Promise<string> {
    return new Promise((resolve, reject) => {
      randomBytes(length, function (err: any, buffer: any) {
        var passphrase = buffer.toString('hex');
        if (err) {
          reject();
        }
        resolve(passphrase);
      });
    });
  }

  async createKeyPair(): Promise<ICreateKeyPairDTO> {
    const passphrase = await new CryptoProvider().randomPassphrase();
    return new Promise((resolve, reject) => {
      generateKeyPair(
        'rsa',
        {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase
          }
        },
        (err: any, publicKey: string, privateKey: string) => {
          if (err) {
            reject();
          }
          resolve({
            passphrase: passphrase.toString(),
            publicKey,
            privateKey
          });
        }
      );
    });
  }

  encrypt({ publicKey, data }: IEncryptDTO): Buffer {
    return publicEncrypt(
      {
        key: publicKey.replace(/\\n/g, '\n').replace(/\\s/g, ' '),
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha512'
      },
      Buffer.from(data)
    );
  }

  decrypt({ passphrase, privateKey, data }: IDecryptDTO): Buffer {
    return privateDecrypt(
      {
        key: privateKey.replace(/\\n/g, '\n').replace(/\\s/g, ' '),
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha512',
        passphrase
      },
      data
    );
  }
}
