const pg = require("pg");

//para alcanzar las variables de entorno
require("dotenv").config();

const pgPool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  host: "localhost",
  database: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

module.exports = pgPool;
