import type { Container } from '@chubbyts/chubbyts-dic-types/dist/container';
import type { Middleware } from '@chubbyts/chubbyts-http-types/dist/middleware';
import { createLazyMiddleware } from '@chubbyts/chubbyts-framework/dist/middleware/lazy-middleware';
import { createErrorMiddleware } from '@chubbyts/chubbyts-framework/dist/middleware/error-middleware';
import { createRouteMatcherMiddleware } from '@chubbyts/chubbyts-framework/dist/middleware/route-matcher-middleware';
import type {
  RequestFactory,
  ResponseFactory,
  ServerRequestFactory,
  StreamFactory,
  UriFactory,
} from '@chubbyts/chubbyts-http-types/dist/message-factory';
import type { Logger } from '@chubbyts/chubbyts-log-types/dist/log';
import { createLogger } from '@chubbyts/chubbyts-log-types/dist/log';
import type { Match } from '@chubbyts/chubbyts-framework/dist/router/route-matcher';
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
import { pino } from 'pino';
import type { RoutesByName } from '@chubbyts/chubbyts-framework/dist/router/routes-by-name';
import { createRoutesByName } from '@chubbyts/chubbyts-framework/dist/router/routes-by-name';
import { createLazyHandler } from '@chubbyts/chubbyts-framework/dist/handler/lazy-handler';
import type { Route } from '@chubbyts/chubbyts-framework/dist/router/route';
import { createGetRoute } from '@chubbyts/chubbyts-framework/dist/router/route';
import type { Config } from '../config/production.js';
import { createPingHandler } from './handler.js';
import type { CleanDirectoriesCommand } from './command.js';
import { createCleanDirectoriesCommand } from './command.js';

export const cleanDirectoriesCommandServiceFactory = (container: Container): CleanDirectoriesCommand => {
  return createCleanDirectoriesCommand(container.get<Config>('config').directories, container.get<Logger>('logger'));
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
  return createPathToRegexpRouteMatcher(container.get<RoutesByName>('routesByName'));
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

export const routesServiceFactory = (container: Container): Array<Route> => {
  const h = (name: string) => createLazyHandler(container, name);

  return [
    createGetRoute({
      path: '/ping',
      name: 'ping',
      handler: h('pingHandler'),
    }),
  ];
};

export const routesByNameServiceFactory = (container: Container): RoutesByName => {
  return createRoutesByName(container.get<Array<Route>>('routes'));
};

export const serverRequestFactoryServiceFactory = (container: Container): ServerRequestFactory => {
  return createServerRequestFactory(container.get<RequestFactory>('requestFactory'));
};

export const streamFactoryServiceFactory = createStreamFactory;

export const streamFromResourceFactoryServiceFactory = createStreamFromResourceFactory;

export const uriFactoryServiceFactory = createUriFactory;
