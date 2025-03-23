import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import { userRouter } from '../controllers/index.js';
import { HTTP_PORT } from '../utils/config.js';

async function main() {
  console.log('start', new Date());

  const app = new Koa();

  app.use(bodyparser());
  app.use(userRouter.routes());
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
