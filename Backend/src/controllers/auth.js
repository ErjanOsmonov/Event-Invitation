import * as crypto from 'node:crypto';
import Router from 'koa-router';
import bcrypt from 'bcrypt';
import { createToken, findByEmail, userRegistration } from '../services/users.js';
import { joiSchema } from '../services/validation.js';
import { joiSchemaLogin } from '../services/loginValidation.js';

export const authRouter = new Router();

authRouter.post('/register', async (ctx) => {
    console.log('post request to /users', ctx.request.body);
    
    try {
        const { value } = joiSchema.validate(ctx.request.body, {
            aboutEarly: false,
        })

        const existingUser = await findByEmail(value.email);
        // console.log('found email', value.email, await existingUser)

        if (existingUser) {
            ctx.status = 409;
            ctx.body = {error: 'Email already exists'};
            return;
        }

        const newUser = await userRegistration(value);
        console.log('finish registration');

        ctx.status = 201;
        ctx.body = {
            message: 'User registered correctly',
            user: newUser,
        }
    } catch (e) {
        ctx.status = 500;
        console.error('Registration error', e.message, e.stack);
        ctx.body = {message: 'Internal Server error', details: e.message}
    }
    
    ctx.status = 201; // created
})

authRouter.post('/login', async (ctx) => {
    const { value } = joiSchemaLogin.validate(ctx.request.body, {
        aboutEarly: false,
    })

    const dbUser = await findByEmail(value.email);

    if (!dbUser) {
        throw new Error('User not found');
    }

    const match = await bcrypt.compare(value.password, dbUser.password);

    if (!match) {
        ctx.status = 400;
        throw new Error('login or password is incorrect');  
    }

    const token = crypto.randomBytes(20).toString('hex');

    createToken(dbUser, token);

    ctx.status = 200;
    ctx.body = {ok: true, token};

    ctx.status = 200;
})

authRouter.post('/logout', async (ctx) => {

})