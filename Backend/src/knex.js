import Knex from 'knex';

let knex;

export async function getKnex() {
    if (knex) {
        return knex;
    }
    const PG_URI = "postgres://postgres:password123@localhost:5432/MyDatabase";

    knex = Knex(PG_URI);

    return knex;
}