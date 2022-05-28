import { Container } from '@chubbyts/chubbyts-dic-types/dist/container';
import { Middleware } from '@chubbyts/chubbyts-http-types/dist/middleware';
import { createLazyMiddleware } from '@chubbyts/chubbyts-framework/dist/middleware/lazy-middleware';
import { createErrorMiddleware } from '@chubbyts/chubbyts-framework/dist/middleware/error-middleware';
import { createRouteMatcherMiddleware } from '@chubbyts/chubbyts-framework/dist/middleware/route-matcher-middleware';
import {
  RequestFactory,
  ResponseFactory,
  ServerRequestFactory,
  StreamFactory,
  StreamFromResourceFactory,
  UriFactory,
} from '@chubbyts/chubbyts-http-types/dist/message-factory';
import { Config } from '../config/prod';
import { createLogger, Logger } from '@chubbyts/chubbyts-log-types/dist/log';
import { Match } from '@chubbyts/chubbyts-framework/dist/router/route-matcher';
import {
  createRequestFactory,
  createResponseFactory,
  createServerRequestFactory,
  createStreamFactory,
  createStreamFromResourceFactory,
  createUriFactory,
} from '@chubbyts/chubbyts-http/dist/message-factory';
import { createPinoAdapter } from '@chubbyts/chubbyts-pino-adapter/dist/pino-adapter';
import { createPathToRegexpRouteMatcher } from '@chubbyts/chubbyts-framework-router-path-to-regexp/dist/path-to-regexp-router';
import pino from 'pino';
import { createRoutesByName, Routes } from '@chubbyts/chubbyts-framework/dist/router/routes';
import { createLazyHandler } from '@chubbyts/chubbyts-framework/dist/handler/lazy-handler';
import { createGetRoute } from '@chubbyts/chubbyts-framework/dist/router/route';
import { createPingHandler } from './handler';
import { CleanDirectoriesCommand, createCleanDirectoriesCommand } from './command';

export const cleanDirectoriesCommandServiceFactory = (container: Container): CleanDirectoriesCommand => {
  return createCleanDirectoriesCommand(container.get<Config>('config').directories);
};

export const errorMiddlewareServiceFactory = (container: Container): Middleware => {
  return createErrorMiddleware(
    container.get<ResponseFactory>('responseFactory'),
    container.get<Config>('config').debug,
    container.get<Logger>('logger'),
  );
};

export const loggerServiceFactory = (container: Container): Logger => {
  const { options, stream } = container.get<Config>('config').pino;

  return createLogger(createPinoAdapter(pino(options, stream)));
};

export const matchServiceFactory = (container: Container): Match => {
  return createPathToRegexpRouteMatcher(container.get<Routes>('routes'));
};

export const middlewaresServiceFactory = (container: Container): Array<Middleware> => {
  const m = (name: string) => createLazyMiddleware(container, name);

  return [m('errorMiddleware'), m('routeMatcherMiddleware')];
};

export const pingHandlerServiceFactory = (container: Container) => {
  return createPingHandler(container.get<ResponseFactory>('responseFactory'));
};

export const requestFactoryServiceFactory = (container: Container): RequestFactory => {
  return createRequestFactory(container.get<UriFactory>('uriFactory'), container.get<StreamFactory>('streamFactory'));
};

export const responseFactoryServiceFactory = (container: Container): ResponseFactory => {
  return createResponseFactory(container.get<StreamFactory>('streamFactory'));
};

export const routeMatcherMiddlewareServiceFactory = (container: Container): Middleware => {
  return createRouteMatcherMiddleware(container.get<Match>('match'));
};

export const routesServiceFactory = (container: Container): Routes => {
  const h = (name: string) => createLazyHandler(container, name);

  return createRoutesByName([
    createGetRoute({
      path: '/ping',
      name: 'ping',
      handler: h('pingHandler'),
    }),
  ]);
};

export const serverRequestFactoryServiceFactory = (container: Container): ServerRequestFactory => {
  return createServerRequestFactory(container.get<RequestFactory>('requestFactory'));
};

export const streamFactoryServiceFactory = (): StreamFactory => {
  return createStreamFactory();
};

export const streamFromResourceFactoryServiceFactory = (): StreamFromResourceFactory => {
  return createStreamFromResourceFactory();
};

export const uriFactoryServiceFactory = (): UriFactory => {
  return createUriFactory();
};
