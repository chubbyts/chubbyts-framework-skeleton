import type { Container } from '@chubbyts/chubbyts-dic-types/container';
import { createLazyMiddleware } from '@chubbyts/chubbyts-framework/middleware/lazy-middleware';
import { createErrorMiddleware } from '@chubbyts/chubbyts-framework/middleware/error-middleware';
import { createRouteMatcherMiddleware } from '@chubbyts/chubbyts-framework/middleware/route-matcher-middleware';
import type { Match } from '@chubbyts/chubbyts-framework/router/route-matcher';
import type { RoutesByName } from '@chubbyts/chubbyts-framework/router/routes-by-name';
import { createRoutesByName } from '@chubbyts/chubbyts-framework/router/routes-by-name';
import { createLazyHandler } from '@chubbyts/chubbyts-framework/handler/lazy-handler';
import type { Route } from '@chubbyts/chubbyts-framework/router/route';
import { createGetRoute } from '@chubbyts/chubbyts-framework/router/route';
import { createPathToRegexpMatch } from '@chubbyts/chubbyts-framework-router-path-to-regexp/path-to-regexp-router';
import {
  createBodyFactory,
  createRequestFactory,
  createResponseFactory,
  createServerRequestFactory,
  createUriFactory,
} from '@chubbyts/chubbyts-http/message-factory';
import type {
  BodyFactory,
  RequestFactory,
  ResponseFactory,
  ServerRequestFactory,
  UriFactory,
} from '@chubbyts/chubbyts-http-types/message-factory';
import type { Middleware } from '@chubbyts/chubbyts-http-types/middleware';
import type { Logger } from '@chubbyts/chubbyts-log-types/log';
import { createLogger } from '@chubbyts/chubbyts-log-types/log';
import { createPinoAdapter } from '@chubbyts/chubbyts-pino-adapter/pino-adapter';
import { pino } from 'pino';
import type { Config } from '../config/production.js';
import type { CleanDirectoriesCommand } from './command.js';
import { createCleanDirectoriesCommand } from './command.js';
import { createPingHandler } from './handler.js';

export const bodyFactoryServiceFactory = (): BodyFactory => createBodyFactory();

export const cleanDirectoriesCommandServiceFactory = (container: Container): CleanDirectoriesCommand =>
  createCleanDirectoriesCommand(container.get<Config>('config').directories, container.get<Logger>('logger'));

export const errorMiddlewareServiceFactory = (container: Container): Middleware =>
  createErrorMiddleware(
    container.get<ResponseFactory>('responseFactory'),
    container.get<BodyFactory>('bodyFactory'),
    container.get<Config>('config').debug,
    container.get<Logger>('logger'),
  );

export const loggerServiceFactory = (container: Container): Logger => {
  const { options, stream } = container.get<Config>('config').pino;

  return createLogger(createPinoAdapter(pino(options, stream)));
};

export const matchServiceFactory = (container: Container): Match =>
  createPathToRegexpMatch(container.get<RoutesByName>('routesByName'));

export const middlewaresServiceFactory = (container: Container): Array<Middleware> => {
  const m = (name: string) => createLazyMiddleware(container, name);

  return [m('errorMiddleware'), m('routeMatcherMiddleware')];
};

export const pingHandlerServiceFactory = (container: Container) =>
  createPingHandler(container.get<ResponseFactory>('responseFactory'), container.get<BodyFactory>('bodyFactory'));

export const requestFactoryServiceFactory = (container: Container): RequestFactory =>
  createRequestFactory(container.get<UriFactory>('uriFactory'), container.get<BodyFactory>('bodyFactory'));

export const responseFactoryServiceFactory = (container: Container): ResponseFactory =>
  createResponseFactory(container.get<BodyFactory>('bodyFactory'));

export const routeMatcherMiddlewareServiceFactory = (container: Container): Middleware =>
  createRouteMatcherMiddleware(container.get<Match>('match'));

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

export const routesByNameServiceFactory = (container: Container): RoutesByName =>
  createRoutesByName(container.get<Array<Route>>('routes'));

export const serverRequestFactoryServiceFactory = (container: Container): ServerRequestFactory =>
  createServerRequestFactory(container.get<RequestFactory>('requestFactory'));

export const uriFactoryServiceFactory = (): UriFactory => createUriFactory();
