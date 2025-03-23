import Router from 'koa-router';
import getKnex from '../knex.js';
import { getUserById } from '../services/users.js';

export const userRouter = new Router();

userRouter.get('/users', async (ctx) => {
    const knex = await getKnex();
    const users = await knex('users');
  
    ctx.body = { users };
    ctx.status = 200;
});

userRouter.get('/users/:id', async (ctx) => {
    
    const user = getUserById(ctx.params.id);
    console.log(user);
    ctx.body = {
        user,
    };
    ctx.status = 200;
});