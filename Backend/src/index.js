import Koa from 'koa';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import getKnex from './knex';
import HTTP_PORT from './utils/config';

const router = new Router();

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

router.get('/users', async (ctx) => {
//   await delay(1000);
  ctx.body = { ok: true };
  ctx.status = 200;
});

router.get('/users/:id', async (ctx) => {
  const knex = await getKnex();
  const user = await knex('users')
    .where({ id: ctx.params.id })
    .first();
  ctx.body = {
    user,
  };
  ctx.status = 200;
});

router.post('/register', async (ctx) => {
//   const knex = await getKnex();
  console.log('post request to /users', ctx.request.body);

  // await knex('users').insert()
  ctx.body = {};
  ctx.status = 201; // created
});

async function main() {
  console.log('start', new Date());

  const knex = await getKnex();

  const res = await knex.raw('select 1 + 1 as sum');

  const app = new Koa();

  app.use(bodyparser());
  app.use(router.routes());
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
