import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import getKnex from './knex.js';
import { HTTP_PORT } from './utils/config.js';
import { userRouter } from './controllers/index.js';

async function main() {
  console.log('start', new Date());

  const knex = await getKnex();

  const res = await knex.raw('select 1 + 1 as sum');

  const app = new Koa();

  app.use(bodyparser());
  // app.use(router.routes());
  app.use(userRouter.routes());
  app.use(async (ctx) => {
    ctx.body = {
      hello: 'world',
    };

    ctx.status = 200;
  });

  console.log(res.rows);

  app.listen(HTTP_PORT, () => {
    console.log(`server started at port ${HTTP_PORT}`);
  });
}

main().catch((e) => {
  console.log(e);

  process.exit(1);
});
