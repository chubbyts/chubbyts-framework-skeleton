import { createWriteStream, realpathSync } from 'fs';
import type { DestinationStream, LoggerOptions } from 'pino';
import type { ConfigFactory } from '@chubbyts/chubbyts-dic-config/dist/dic-config';
import {
  cleanDirectoriesCommandServiceFactory,
  errorMiddlewareServiceFactory,
  loggerServiceFactory,
  matchServiceFactory,
  middlewaresServiceFactory,
  pingHandlerServiceFactory,
  routeMatcherMiddlewareServiceFactory,
  routesByNameServiceFactory,
  routesServiceFactory,
} from '../src/service-factory.js';

export type Config = {
  debug: boolean;
  dependencies: {
    factories: Map<string, ConfigFactory>;
  };
  directories: Map<string, string>;
  pino: {
    options: Omit<LoggerOptions, 'level'> & { level: 'fatal' | 'error' | 'warn' | 'info' | 'debug' };
    stream: DestinationStream;
  };
  server: {
    host: string;
    port: number;
  };
};

const rootDir = realpathSync(new URL('..', import.meta.url));

export const configFactory = (env: string): Config => {
  console.log(`Loading "${env}" config`);

  const cacheDir = rootDir + '/var/cache';
  const logDir = rootDir + '/var/log';

  const logStream = createWriteStream(logDir + '/application.log', { flags: 'a' });

  return {
    debug: false,
    dependencies: {
      factories: new Map<string, ConfigFactory>([
        ['cleanDirectoriesCommand', cleanDirectoriesCommandServiceFactory],
        ['errorMiddleware', errorMiddlewareServiceFactory],
        ['logger', loggerServiceFactory],
        ['match', matchServiceFactory],
        ['middlewares', middlewaresServiceFactory],
        ['pingHandler', pingHandlerServiceFactory],
        ['routeMatcherMiddleware', routeMatcherMiddlewareServiceFactory],
        ['routes', routesServiceFactory],
        ['routesByName', routesByNameServiceFactory],
      ]),
    },
    directories: new Map([
      ['cache', cacheDir],
      ['log', logDir],
    ]),
    pino: {
      options: {
        name: 'chubbyts-framework-skeleton',
        level: 'info',
      },
      stream: {
        write: (msg: string): void => {
          logStream.write(msg);
          console.log(msg);
        },
      },
    },
    server: {
      host: process.env.SERVER_HOST as string,
      port: parseInt(process.env.SERVER_PORT as string, 10),
    },
  };
};
