import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import { userRouter } from '../controllers/index.js';
import { HTTP_PORT } from '../utils/config.js';

const logger = {
  info: (...args) => console.log(new Date(), ...args),
  error: (...args) => console.error(new Date(), ...args),
};

async function main() {
  logger.info('Server starting...');

  const app = new Koa();

  app.use(bodyparser({
    enableTypes: ['json', 'form'],
    jsonLimit: '10mb',
    formLimit: '10mb',
    onerror: (err, ctx) => {
      ctx.throw(400, 'Body parse error');
    },
  }));

  app.use(async (ctx, next) => {
    try {
      await next();
      logger.info('Request processed successfully');
    } catch (e) {
      if (e.isJoi) {
        logger.info('Validation error occurred');
        ctx.status = 400;
        ctx.body = {
          errors: e.details.map(detail => ({
            message: detail.message,
            path: detail.path,
          })),
        };
        return;
      }

      logger.error('Server error:', e.message);
      ctx.status = e.status || 500;
      ctx.body = {
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: e.stack }),
      };
    }
  });

  app.use(async (ctx, next) => {
    const start = Date.now();
    logger.info('Request:', ctx.method, ctx.url);
    await next();
    const ms = Date.now() - start;
    logger.info(`Response: ${ctx.status} - ${ms}ms`);
  });

  app.use(userRouter.routes());
  app.use(userRouter.allowedMethods());

  app.use(async (ctx) => {
    if (!ctx.matched?.length) {
      ctx.status = 200;
      ctx.body = { hello: 'world' };
    }
  });

  return new Promise((resolve) => {
    const server = app.listen(HTTP_PORT, () => {
      logger.info(`Server running on port ${HTTP_PORT}`);
      resolve(server);
    });
  });
}

main()
  .then(() => logger.info('Application started successfully'))
  .catch((e) => {
    logger.error('Startup failed:', e);
    process.exit(1);
  });
