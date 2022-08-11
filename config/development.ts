import production, { Config } from './production';

export default (env: string): Config => {
  const config = production(env);

  return {
    ...config,
    debug: true,
    pino: {
      ...config.pino,
      options: {
        ...config.pino.options,
        level: 'debug',
      },
    },
  };
};
