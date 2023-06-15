const Pool = require("pg").Pool;
require("dotenv").config();

// const devConfig = {
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   port: process.env.PG_PORT,
// };

// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const devConfig = `postgresql://yiiturdymoiank:59f5ca120f930948224f326c75ef6c59b8d9c178542890b41c13609ddd8fa30c@ec2-54-156-8-21.compute-1.amazonaws.com:5432/$d2j3ghhqsg6981`;

const proConfig = process.env.HEROKU_POSTGRESQL_PURPLE_URL; //heroku addons

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? devConfig : proConfig,
});

module.exports = pool;