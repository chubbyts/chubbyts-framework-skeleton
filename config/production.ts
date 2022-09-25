import { DestinationStream, LoggerOptions } from 'pino';
import { createWriteStream, realpathSync, WriteStream } from 'fs';
import { ConfigFactory } from '@chubbyts/chubbyts-dic-config/dist/dic-config';
import {
  cleanDirectoriesCommandServiceFactory,
  errorMiddlewareServiceFactory,
  loggerServiceFactory,
  matchServiceFactory,
  middlewaresServiceFactory,
  pingHandlerServiceFactory,
  requestFactoryServiceFactory,
  responseFactoryServiceFactory,
  routeMatcherMiddlewareServiceFactory,
  routesByNameServiceFactory,
  routesServiceFactory,
  serverRequestFactoryServiceFactory,
  streamFactoryServiceFactory,
  streamFromResourceFactoryServiceFactory,
  uriFactoryServiceFactory,
} from '../src/service-factory';

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

const rootDir = realpathSync(__dirname + '/..');

export const configFactory = (env: string): Config => {
  console.log(`Loading "${env}" config`);

  const cacheDir = rootDir + '/var/cache';
  const logDir = rootDir + '/var/log';

  let logStream: WriteStream | undefined;

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
        ['requestFactory', requestFactoryServiceFactory],
        ['responseFactory', responseFactoryServiceFactory],
        ['routeMatcherMiddleware', routeMatcherMiddlewareServiceFactory],
        ['routes', routesServiceFactory],
        ['routesByName', routesByNameServiceFactory],
        ['serverRequestFactory', serverRequestFactoryServiceFactory],
        ['streamFactory', streamFactoryServiceFactory],
        ['streamFromResourceFactory', streamFromResourceFactoryServiceFactory],
        ['uriFactory', uriFactoryServiceFactory],
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
          if (!logStream) {
            logStream = createWriteStream(logDir + '/application.log', { flags: 'a' });
          }

          logStream.write(msg);
        },
      },
    },
    server: {
      host: process.env.SERVER_HOST as string,
      port: parseInt(process.env.SERVER_PORT as string, 10),
    },
  };
};
