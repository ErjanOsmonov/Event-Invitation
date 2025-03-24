import Router from 'koa-router';
import Joi from 'joi';
import { getUserById, getUsers } from '../services/users.js';

export const userRouter = new Router();

userRouter.get('/users', async (ctx) => {
    const users = await getUsers()
  
    ctx.body = { users };
    ctx.status = 200;
    // throw new Error('some error');
});

userRouter.get('/users/:id', async (ctx) => {
    const user = await getUserById(ctx.params.id);
    
    ctx.body = {
        user,
    };
    ctx.status = 200;
});

userRouter.post('/register', async (ctx) => {
    console.log('post request to /users', ctx.request.body);
    const joiSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const value = await joiSchema.validateAsync(ctx.request.body);
    // console.log(value);

    ctx.body = {value};
    ctx.status = 201; // created
})