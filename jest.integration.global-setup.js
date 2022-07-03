const { spawn } = require('child_process');

const startServer = async () => {
  return new Promise((resolve, reject) => {
    const child = spawn(process.argv[0], ['node_modules/.bin/ts-node', 'public/index.ts'], {
      env: {
        APP_ENV: 'jest',
        SERVER_HOST: '127.0.0.1',
        SERVER_PORT: 12345,
      },
      detached: true,
    }).once('error', (err) => {
      console.error(err);
      reject();
    });

    let data = '';

    child.stdout.on('data', function (buffer) {
      data += buffer.toString('utf-8');

      if (-1 !== data.search('Listening to')) {
        resolve(child);
      }
    });
  });
};

module.exports = async () => {
  global.__HTTP_SERVER__ = await startServer();
};
