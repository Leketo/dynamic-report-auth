import { container } from 'tsyringe';
import CryptoProvider from './implementations/CryptoProvider';
import IEncryptDataProvider from './models/IEncryptDataProvider';

const providers = {
  crypto: CryptoProvider
};

container.registerSingleton<IEncryptDataProvider>('EncryptDataProvider', providers.crypto);
