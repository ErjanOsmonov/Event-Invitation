import getKnex from "../knex.js";

export async function getUserById(id) {
    const knex = await getKnex();
    const user = await knex('users')
        .where({ id: id })
        .first();  
        // console.log(user);
        
    return user;
}

export async function getUsers() {
    const knex = await getKnex();
    const users = await knex('users')

    return users;
}