// Update with your config settings.
const path = require("path")
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "messages_database",
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB
    },
    migrations: {
      directory: path.join(__dirname, "database", "migrations")
    },
    seeds: {
      directory: "./database/seeds"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "database", "migrations")
    }
  }
}
