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
};

const rootDir = realpathSync(__dirname + '/..');

export default (env: string): Config => {
  const cacheDir = rootDir + '/var/cache/' + env;
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
            logStream = createWriteStream(logDir + '/' + env + '.log', { flags: 'a' });
          }

          logStream.write(msg);
        },
      },
    },
  };
};
