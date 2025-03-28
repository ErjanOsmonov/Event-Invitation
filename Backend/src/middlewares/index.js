import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import { userRouter, authRouter } from '../controllers/index.js';
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
      if (e.isJoi) {
        console.log('This is JOI error');
        ctx.status = 400;
        ctx.body = {
          errors: e.details,
        }
        return;
      }

      console.log('caught in try-catch', e.message, e.stack, e.details);
      ctx.status = 500;
      ctx.body = {
        message: e.message,
        errors: e.details,
      }
    };
  });

  app.use(authRouter.routes());

  app.use(async (ctx, next) => {
    const { headers } = ctx.request;

    console.log(headers);
    const {authorization} = headers;

    const token = authorization?.split(' ')[1];
    console.log(token);

    if (!true) {
      throw new Error("NOT AUTHORIZED");
    }

    return next();
  })
  
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
