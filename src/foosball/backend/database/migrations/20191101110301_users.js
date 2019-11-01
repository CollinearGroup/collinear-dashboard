exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', table => {
      table.increments()
      table.string('first_name').notNullable().defaultsTo('')
      table.string('last_name').notNullable().defaultsTo('')
      table.integer('current_rating').notNullable().defaultsTo(1000)
      table.integer('games_played').notNullable().defaultsTo(0)
      table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}