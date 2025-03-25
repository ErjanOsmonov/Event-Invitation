import getKnex from "../knex.js";   
import bcrypt, { hash } from 'bcrypt';

const knex = await getKnex();

export async function getUserById(id) {
    const user = await knex('users')
        .where({ id: id })
        .first();  
        // console.log(user);
        
    return user;
}

export async function getUsers() {
    const users = await knex('users')

    return users;
}

export async function userRegistration(info) {
    console.log('start userregistation');

    const {name, surname, email, password} = info;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const [user] = await knex('users')
        .insert({
            name,
            surname,
            email,
            password: hashedPassword,
        })
        .returning(['id', 'name', 'surname', 'email']);

    console.log('edned registartion');
    return user;
}

export async function findByEmail(email) {
    return await knex('users').where({email}).first();
}