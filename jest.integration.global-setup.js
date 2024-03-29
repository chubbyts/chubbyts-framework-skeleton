/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
/* eslint-disable no-undef */
const { spawn } = require('child_process');
const fetch = require('cross-fetch');

const getRandomInt = (min, max) => {
  const ceiledMin = Math.ceil(min);
  const flooredMax = Math.floor(max);
  return Math.floor(Math.random() * (flooredMax - ceiledMin + 1)) + ceiledMin;
};

const testServerHost = '127.0.0.1';
const testServerPort = getRandomInt(49152, 65535);

const timeout = 20000;
const iterationTimeout = 500;

const startServer = async () => {
  console.log(process.argv[0]);

  const child = spawn(process.argv[0], ['-r', 'ts-node/register', 'bootstrap/index.ts'], {
    env: {
      NODE_ENV: 'jest',
      SERVER_HOST: testServerHost,
      SERVER_PORT: testServerPort,
    },
    detached: true,
  }).once('error', (e) => {
    throw e;
  });

  for (let i = timeout; i > 0; i -= iterationTimeout) {
    try {
      await fetch(`http://${testServerHost}:${testServerPort}`);
      return child;
    } catch (e) {
      if (e.code === 'ECONNREFUSED') {
        console.log('wait for test server to be up and running...');
        await new Promise((resolve) => setTimeout(resolve, iterationTimeout));
      } else {
        throw e;
      }
    }
  }

  throw new Error('Timeout in starting the server');
};

module.exports = async () => {
  if (!global.__HTTP_SERVER__) {
    global.__HTTP_SERVER__ = await startServer();
    process.env.HTTP_URI = `http://${testServerHost}:${testServerPort}`;
  }

  console.log(
    JSON.stringify(
      {
        HTTP_URI: process.env.HTTP_URI,
      },
      null,
      2,
    ),
  );
};
