import type { IncomingMessage, ServerResponse } from 'http';
import { createServer } from 'http';
import { createApplication } from '@chubbyts/chubbyts-framework/dist/application';
import {
  createNodeToServerRequestFactory,
  createResponseToNodeEmitter,
} from '@chubbyts/chubbyts-http-node-bridge/dist/node-http';
import type { Middleware } from '@chubbyts/chubbyts-http-types/dist/middleware';
import type {
  ServerRequestFactory,
  StreamFromResourceFactory,
  UriFactory,
} from '@chubbyts/chubbyts-http-types/dist/message-factory';
import type { Config } from '../config/production.js';
import { containerFactory } from '../bootstrap/container.js';

(async () => {
  const container = await containerFactory(process.env.NODE_ENV as string);

  const app = createApplication(container.get<Array<Middleware>>('middlewares'));

  const nodeToServerRequestFactory = createNodeToServerRequestFactory(
    container.get<UriFactory>('uriFactory'),
    container.get<ServerRequestFactory>('serverRequestFactory'),
    container.get<StreamFromResourceFactory>('streamFromResourceFactory'),
  );

  const responseToNodeEmitter = createResponseToNodeEmitter();

  const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    responseToNodeEmitter(await app(nodeToServerRequestFactory(req)), res);
  });

  const config = container.get<Config>('config');

  const { port, host } = config.server;

  server.listen(port, host, () => {
    console.log(`Listening to ${host}:${port}`);
  });
})();
