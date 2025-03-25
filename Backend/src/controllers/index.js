import Router from 'koa-router';
import { findByEmail, getUserById, getUsers, userRegistration } from '../services/users.js';
import { joiSchema } from '../services/validation.js';

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
    
    try {
        const { value } = joiSchema.validate(ctx.request.body, {
            aboutEarly: false,
        })

        const existingUser = await findByEmail(value.email);
        if (existingUser) {
            ctx.status = 409;
            ctx.body = {error: 'Email already exists'};
            return;
        }

        const newUser = await userRegistration(value);

        ctx.status = 201;
        ctx.body = {
            message: 'User registered correctly',
            user: newUser,
        }
    } catch (e) {
        ctx.status = 500;
        console.error('Registration error')
    }
    
    ctx.status = 201; // created
})