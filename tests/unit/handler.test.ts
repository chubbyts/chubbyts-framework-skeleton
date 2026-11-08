import { describe, expect, test } from 'vitest';
import type { Body, ServerRequest, Response } from '@chubbyts/chubbyts-http-types/message';
import type { BodyFactory, ResponseFactory } from '@chubbyts/chubbyts-http-types/message-factory';
import { useFunctionMock } from '@chubbyts/chubbyts-function-mock/function-mock';
import { createPingHandler } from '../../src/handler.js';

describe('handler', () => {
  test('createPingHandler', async () => {
    const serverRequest = {} as ServerRequest;
    const emptyBody = {} as Body;
    const body = {} as Body;

    const response = {
      status: 200,
      reasonPhrase: 'OK',
      protocolVersion: '1.1',
      headers: { 'some-header': ['some-value'] },
      body: emptyBody,
    } as Response;

    const [responseFactory, responseFactoryMocks] = useFunctionMock<ResponseFactory>([
      { parameters: [200], return: response },
    ]);

    const [bodyFactory, bodyFactoryMocks] = useFunctionMock<BodyFactory>([
      {
        callback: (content: string) => {
          expect(JSON.parse(content)).toEqual({ datetime: expect.any(String) });

          return body;
        },
      },
    ]);

    const pingHandler = createPingHandler(responseFactory, bodyFactory);

    expect(await pingHandler(serverRequest)).toEqual({
      ...response,
      headers: {
        'some-header': ['some-value'],
        'content-type': ['application/json'],
        'cache-control': ['no-cache, no-store, must-revalidate'],
        pragma: ['no-cache'],
        expires: ['0'],
      },
      body,
    });

    expect(responseFactoryMocks).toHaveLength(0);
    expect(bodyFactoryMocks).toHaveLength(0);
  });
});
