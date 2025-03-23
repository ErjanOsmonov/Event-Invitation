import Router from 'koa-router';
import { getUserById, getUsers } from '../services/users.js';

export const userRouter = new Router();

userRouter.get('/users', async (ctx) => {
    const users = await getUsers()
  
    ctx.body = { users };
    ctx.status = 200;
});

userRouter.get('/users/:id', async (ctx) => {
    const user = await getUserById(ctx.params.id);
    
    ctx.body = {
        user,
    };
    ctx.status = 200;
});