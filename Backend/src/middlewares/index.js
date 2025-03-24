import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import { userRouter } from '../controllers/index.js';
import { HTTP_PORT } from '../utils/config.js';

async function main() {
  console.log('start', new Date());

  const app = new Koa();

  app.use(bodyparser());

  app.use(async (ctx, next) => {
    try {
      await next();
      console.log('after request in try-catch')
    } catch (e) {
      console.log(e);
      console.log('caught in try-catch', e.message);

      ctx.status = 500;
      ctx.body = {
        message: e.message,
      }
    };
  });

  app.use(async (ctx, next) => {
    console.log(ctx.method, ctx.url, ctx.body);

    await next();
    console.log('after request in logger')
  })

  app.use(userRouter.routes());
  app.use(userRouter.allowedMethods())
  app.use(async (ctx) => {
    ctx.body = {
      hello: 'world',
    };

    ctx.status = 200;
  });

  app.listen(HTTP_PORT, () => {
    console.log(`server started at port ${HTTP_PORT}`);
  });
}

main().catch((e) => {
  console.log(e);

  process.exit(1);
});
