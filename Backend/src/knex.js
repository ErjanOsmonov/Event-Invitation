import Knex from 'knex';
import {PG_URI} from './utils/config.js';

let knex;

export default async function getKnex() {
  if (knex) {
    return knex;
  }

  // const PG_URI = "postgres://postgres:password123@localhost:5432/MyDatabase"
  // console.log(PG_URI);

  knex = Knex(`${PG_URI}`);

  return knex;
}
