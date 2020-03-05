// Update with your config settings.
const path = require('path')

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : 'database',
      user : 'test',
      password : 'test',
      database : 'foosball'
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
    },
    seeds: {
      directory: path.join(__dirname, 'database', 'seeds')
    }
  }
};