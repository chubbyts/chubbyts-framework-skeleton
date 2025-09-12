import type { Container } from '@chubbyts/chubbyts-dic-types/dist/container';
import { describe, expect, test } from 'vitest';
import { useObjectMock } from '@chubbyts/chubbyts-function-mock/dist/object-mock';
import { useFunctionMock } from '@chubbyts/chubbyts-function-mock/dist/function-mock';
import type { Handler } from '@chubbyts/chubbyts-undici-server/dist/server';
import { Response, ServerRequest } from '@chubbyts/chubbyts-undici-server/dist/server';
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
} from '../../src/service-factory.js';

describe('service-factory', () => {
  test('cleanDirectoriesCommandServiceFactory', () => {
    const [container, containerMocks] = useObjectMock<Container>([
      {
        name: 'get',
        parameters: ['config'],
        return: { directories: new Map([]) },
      },
      {
        name: 'get',
        parameters: ['logger'],
        return: {},
      },
    ]);

    expect(cleanDirectoriesCommandServiceFactory(container)).toBeInstanceOf(Function);

    expect(containerMocks.length).toBe(0);
  });

  test('errorMiddlewareServiceFactory', () => {
    const [container, containerMocks] = useObjectMock<Container>([
      {
        name: 'get',
        parameters: ['config'],
        return: { debug: true },
      },
      {
        name: 'get',
        parameters: ['logger'],
        return: {},
      },
    ]);

    expect(errorMiddlewareServiceFactory(container)).toBeInstanceOf(Function);

    expect(containerMocks.length).toBe(0);
  });

  test('loggerServiceFactory', () => {
    const [container, containerMocks] = useObjectMock<Container>([
      {
        name: 'get',
        parameters: ['config'],
        return: {
          pino: {
            options: {},
            stream: { write: () => null },
          },
        },
      },
    ]);

    expect(loggerServiceFactory(container)).toBeInstanceOf(Object);

    expect(containerMocks.length).toBe(0);
  });

  test('matchServiceFactory', () => {
    const [container, containerMocks] = useObjectMock<Container>([
      {
        name: 'get',
        parameters: ['routesByName'],
        return: new Map(),
      },
    ]);

    expect(matchServiceFactory(container)).toBeInstanceOf(Function);

    expect(containerMocks.length).toBe(0);
  });

  test('middlewaresServiceFactory', async () => {
    const request = {} as ServerRequest;
    const response = {} as Response;

    const [handler, handlerMocks] = useFunctionMock<Handler>([]);

    const [container, containerMocks] = useObjectMock<Container>([
      {
        name: 'get',
        parameters: ['errorMiddleware'],
        return: async () => response,
      },
      {
        name: 'get',
        parameters: ['routeMatcherMiddleware'],
        return: async () => response,
      },
    ]);

    const middlewares = middlewaresServiceFactory(container);

    expect(middlewares).toBeInstanceOf(Array);

    expect(middlewares).toMatchInlineSnapshot(`
      [
        [Function],
        [Function],
      ]
    `);

    expect(await Promise.all(middlewares.map((middleware) => middleware(request, handler)))).toEqual(
      middlewares.map(() => response),
    );

    expect(handlerMocks.length).toBe(0);
    expect(containerMocks.length).toBe(0);
  });

  test('pingHandlerServiceFactory', () => {
    expect(pingHandlerServiceFactory()).toBeInstanceOf(Function);
  });

  test('routeMatcherMiddlewareServiceFactory', () => {
    const [container, containerMocks] = useObjectMock<Container>([
      {
        name: 'get',
        parameters: ['match'],
        return: () => null,
      },
    ]);

    expect(routeMatcherMiddlewareServiceFactory(container)).toBeInstanceOf(Function);

    expect(containerMocks.length).toBe(0);
  });

  test('routesServiceFactory', async () => {
    const serverRequest = new ServerRequest('https://example.com/');
    const response = new Response();

    const [container, containerMocks] = useObjectMock<Container>([
      {
        name: 'get',
        parameters: ['pingHandler'],
        return: async () => response,
      },
    ]);

    const routes = routesServiceFactory(container);

    expect(routes).toBeInstanceOf(Array);

    expect(routes).toMatchInlineSnapshot(`
      [
        {
          "_route": "Route",
          "attributes": {},
          "handler": [Function],
          "method": "GET",
          "middlewares": [],
          "name": "ping",
          "path": "/ping",
          "pathOptions": {},
        },
      ]
    `);

    expect(await Promise.all(routes.map((route) => route.handler(serverRequest)))).toEqual(routes.map(() => response));

    expect(containerMocks.length).toBe(0);
  });

  test('routesByNameServiceFactory', () => {
    const [container, containerMocks] = useObjectMock<Container>([
      {
        name: 'get',
        parameters: ['routes'],
        return: [],
      },
    ]);

    expect(routesByNameServiceFactory(container)).toBeInstanceOf(Map);

    expect(containerMocks.length).toBe(0);
  });
});
