// Shared Postgres pool (plain `pg`, no ORM). Every module that touches the
// DB should require this file rather than opening its own connection/pool.
require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on("error", (err) => {
  // Errors on idle clients shouldn't crash the process.
  console.error("Unexpected error on idle Postgres client", err);
});

module.exports = pool;
