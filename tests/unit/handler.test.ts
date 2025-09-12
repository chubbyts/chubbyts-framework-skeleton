import { describe, expect, test } from 'vitest';
import { ServerRequest } from '@chubbyts/chubbyts-undici-server/dist/server';
import { createPingHandler } from '../../src/handler.js';

describe('handler', () => {
  test('createPingHandler', async () => {
    const serverRequest = new ServerRequest('https://example.com/ping');

    const pingHandler = createPingHandler();

    const response = await pingHandler(serverRequest);

    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(Object.fromEntries([...response.headers.entries()])).toMatchInlineSnapshot(`
      {
        "cache-control": "no-cache, no-store, must-revalidate",
        "content-type": "application/json",
        "expires": "0",
        "pragma": "no-cache",
      }
    `);

    expect(await response.json()).toEqual({ datetime: expect.any(String) });
  });
});
