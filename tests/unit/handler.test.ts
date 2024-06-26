import type { Duplex } from 'stream';
import { describe, expect, test } from 'vitest';
import type { ServerRequest, Response } from '@chubbyts/chubbyts-http-types/dist/message';
import type { ResponseFactory } from '@chubbyts/chubbyts-http-types/dist/message-factory';
import { useObjectMock } from '@chubbyts/chubbyts-function-mock/dist/object-mock';
import { useFunctionMock } from '@chubbyts/chubbyts-function-mock/dist/function-mock';
import { createPingHandler } from '../../src/handler.js';

describe('handler', () => {
  test('createPingHandler', async () => {
    const request = {} as ServerRequest;

    const [responseBody, responseBodyMocks] = useObjectMock<Duplex>([
      {
        name: 'end',
        callback: (givenChunk) => {
          const data = JSON.parse(givenChunk);

          expect(data).toEqual({
            datetime: expect.any(String),
          });

          return responseBody;
        },
      },
    ]);

    const [response, responseMocks] = useObjectMock<Response>([
      { name: 'body', value: responseBody },
      { name: 'headers', value: { 'some-header': ['some-value'] } },
    ]);

    const [responseFactory, responseFactoryMocks] = useFunctionMock<ResponseFactory>([
      { parameters: [200], return: response },
    ]);

    const pingHandler = createPingHandler(responseFactory);

    expect(await pingHandler(request)).toEqual({
      ...response,
      headers: {
        'content-type': ['application/json'],
        'cache-control': ['no-cache, no-store, must-revalidate'],
        pragma: ['no-cache'],
        expires: ['0'],
        'some-header': ['some-value'],
      },
    });

    expect(responseBodyMocks.length).toBe(0);
    expect(responseMocks.length).toBe(0);
    expect(responseFactoryMocks.length).toBe(0);
  });
});
