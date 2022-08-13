import { configFactory as productionConfigFactory, Config } from './production';

export const configFactory = (env: string): Config => {
  const config = productionConfigFactory(env);

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
