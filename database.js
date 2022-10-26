const knex = require('knex')
require('dotenv').config()

exports.db = knex({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_ADDRESS ,
      user : process.env.DATABASE_USER ,
      password : process.env.DATABASE_PASSWORD ,
      database : process.env.DATABASE_NAME ,
      ssl: 'true'
    }
  });