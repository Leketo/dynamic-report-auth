import 'dotenv/config';
import 'reflect-metadata';
import { json, urlencoded } from 'body-parser';
import compress from 'compression';
import express, { NextFunction, Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
var cors = require('cors');
import * as http from 'http';

import 'express-async-errors';
import { registerRoutes } from './routes';

import '../../../containers';
import AppError from '../../../errors/AppError';

export class Server {
  private express: express.Express;

  private port: string;

  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(json());
    this.express.use(cors());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    this.express.use(compress());
    const router = Router();
    this.express.use(router);

    registerRoutes(router);

    // Implementation of the error handler
    this.express.use((err: Error, request: Request, response: Response, _: NextFunction) => {
      console.log('err:::', err);
      if (err instanceof AppError) {
        const payloadError = {
          message: err.message,
          data: []
        };

        if (err.code) {
          Object.assign(payloadError, { code: err.code });
        }

        if (Boolean(err.data)) {
          Object.assign(payloadError, { data: err.data });
        }

        return response.status(Number(err.status_code)).json(payloadError);
      }

      console.log('error handle', err);

      return response.status(500).json({
        message: 'Internal Server Error',
        code: '99999'
      });
    });
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `  Mock Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
        );
        console.log('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
