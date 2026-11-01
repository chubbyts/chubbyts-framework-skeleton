import type { Handler } from '@chubbyts/chubbyts-http-types/handler';
import type { Response } from '@chubbyts/chubbyts-http-types/message';
import type { BodyFactory, ResponseFactory } from '@chubbyts/chubbyts-http-types/message-factory';

export const createPingHandler = (responseFactory: ResponseFactory, bodyFactory: BodyFactory): Handler => {
  return async (): Promise<Response> => {
    const response = responseFactory(200);

    return {
      ...response,
      headers: {
        ...response.headers,
        'content-type': ['application/json'],
        'cache-control': ['no-cache, no-store, must-revalidate'],
        pragma: ['no-cache'],
        expires: ['0'],
      },
      body: bodyFactory(JSON.stringify({ datetime: new Date().toISOString() })),
    };
  };
};
