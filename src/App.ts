import 'dotenv/config';
import { Server } from '@shared/infra/http/express/Server';

export class App {
  server?: Server;

  async start() {
    const port = process.env.PORT || '3002';
    this.server = new Server(port);
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    return this.server?.stop();
  }
}
