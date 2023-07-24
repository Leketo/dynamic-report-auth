import { container } from 'tsyringe';
import JsonWebTokenProvider from './implementations/JsonWebTokenProvider';
import ITokenProvider from './models/ITokenProvider';

const providers = {
  jsonwebtoken: JsonWebTokenProvider
};

container.registerSingleton<ITokenProvider>('TokenProvider', providers.jsonwebtoken);
