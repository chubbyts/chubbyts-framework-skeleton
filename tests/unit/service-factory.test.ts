import { Container } from '@chubbyts/chubbyts-dic-types/dist/container';
import { describe, expect, jest, test } from '@jest/globals';
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
} from '../../src/service-factory';

const createGetMock = (givenCalls: Array<[string, unknown]>) => {
  const calls = [...givenCalls];

  return (givenId: string) => {
    const call = calls.shift();
    if (!call) {
      fail('Missing call');
    }

    const [id, service] = call;

    expect(givenId).toBe(id);

    return service;
  };
};

describe('service-factory', () => {
  test('cleanDirectoriesCommandServiceFactory', () => {
    const calls: Array<[string, unknown]> = [['config', { directories: new Map([]) }]];

    const get = jest.fn(createGetMock(calls));

    const container = { get } as unknown as Container;

    expect(cleanDirectoriesCommandServiceFactory(container)).toBeInstanceOf(Function);

    expect(get).toHaveBeenCalledTimes(calls.length);
  });

  test('errorMiddlewareServiceFactory', () => {
    const calls: Array<[string, unknown]> = [
      ['responseFactory', () => null],
      ['config', { debug: true }],
      ['logger', () => null],
    ];

    const get = jest.fn(createGetMock(calls));

    const container = { get } as unknown as Container;

    expect(errorMiddlewareServiceFactory(container)).toBeInstanceOf(Function);

    expect(get).toHaveBeenCalledTimes(calls.length);
  });

  test('loggerServiceFactory', () => {
    const calls: Array<[string, unknown]> = [
      [
        'config',
        {
          pino: {
            options: {},
            stream: { write: () => null },
          },
        },
      ],
    ];

    const get = jest.fn(createGetMock(calls));

    const container = { get } as unknown as Container;

    expect(loggerServiceFactory(container)).toBeInstanceOf(Object);

    expect(get).toHaveBeenCalledTimes(calls.length);
  });

  test('matchServiceFactory', () => {
    const calls: Array<[string, unknown]> = [['routesByName', new Map()]];

    const get = jest.fn(createGetMock(calls));

    const container = { get } as unknown as Container;

    expect(matchServiceFactory(container)).toBeInstanceOf(Function);

    expect(get).toHaveBeenCalledTimes(calls.length);
  });

  test('middlewaresServiceFactory', () => {
    const calls: Array<[string, unknown]> = [];

    const get = jest.fn(createGetMock(calls));

    const container = { get } as unknown as Container;

    const middlewares = middlewaresServiceFactory(container);

    expect(middlewares).toBeInstanceOf(Array);

    expect(middlewares).toMatchInlineSnapshot(`
      [
        [Function],
        [Function],
      ]
    `);

    expect(get).toHaveBeenCalledTimes(calls.length);
  });

  test('pingHandlerServiceFactory', () => {
    const calls: Array<[string, unknown]> = [['responseFactory', () => null]];

    const get = jest.fn(createGetMock(calls));

    const container = { get } as unknown as Container;

    expect(pingHandlerServiceFactory(container)).toBeInstanceOf(Function);

    expect(get).toHaveBeenCalledTimes(calls.length);
  });

  test('requestFactoryServiceFactory', () => {
    const calls: Array<[string, unknown]> = [
      ['uriFactory', () => null],
      ['streamFactory', () => null],
    ];

    const get = jest.fn(createGetMock(calls));

    const container = { get } as unknown as Container;

    expect(requestFactoryServiceFactory(container)).toBeInstanceOf(Function);

    expect(get).toHaveBeenCalledTimes(calls.length);
  });

  test('responseFactoryServiceFactory', () => {
    const calls: Array<[string, unknown]> = [['streamFactory', () => null]];

    const get = jest.fn(createGetMock(calls));

    const container = { get } as unknown as Container;

    expect(responseFactoryServiceFactory(container)).toBeInstanceOf(Function);

    expect(get).toHaveBeenCalledTimes(calls.length);
  });

  test('routeMatcherMiddlewareServiceFactory', () => {
    const calls: Array<[string, unknown]> = [['match', () => null]];

    const get = jest.fn(createGetMock(calls));

    const container = { get } as unknown as Container;

    expect(routeMatcherMiddlewareServiceFactory(container)).toBeInstanceOf(Function);

    expect(get).toHaveBeenCalledTimes(calls.length);
  });

  test('routesServiceFactory', () => {
    const calls: Array<[string, unknown]> = [];

    const get = jest.fn(createGetMock(calls));

    const container = { get } as unknown as Container;

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

    expect(get).toHaveBeenCalledTimes(calls.length);
  });

  test('routesByNameServiceFactory', () => {
    const calls: Array<[string, unknown]> = [['routes', []]];

    const get = jest.fn(createGetMock(calls));

    const container = { get } as unknown as Container;

    expect(routesByNameServiceFactory(container)).toBeInstanceOf(Map);

    expect(get).toHaveBeenCalledTimes(calls.length);
  });

  test('serverRequestFactoryServiceFactory', () => {
    const calls: Array<[string, unknown]> = [['requestFactory', () => null]];

    const get = jest.fn(createGetMock(calls));

    const container = { get } as unknown as Container;

    expect(serverRequestFactoryServiceFactory(container)).toBeInstanceOf(Function);

    expect(get).toHaveBeenCalledTimes(calls.length);
  });

  test('streamFactoryServiceFactory', () => {
    expect(streamFactoryServiceFactory()).toBeInstanceOf(Function);
  });

  test('streamFromResourceFactoryServiceFactory', () => {
    expect(streamFromResourceFactoryServiceFactory()).toBeInstanceOf(Function);
  });

  test('uriFactoryServiceFactory', () => {
    expect(uriFactoryServiceFactory()).toBeInstanceOf(Function);
  });
});
