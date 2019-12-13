// Update with your config settings.
const path = require('path')

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'messages_database',
      user: 'test',
      password: 'test',
      database: 'messages_db'
    },
    migrations: {
      directory: path.join(__dirname, 'database', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'database', 'seeds')
    }
  },


  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'database', 'migrations')
    }
  }
};