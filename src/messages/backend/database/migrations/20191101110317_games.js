exports.up = function (knex, Promise) {
  return knex.schema.createTable('kudos', table => {
    table.increments()
    table.string('poster_first_name').notNullable().defaultsTo('')
    table.string('poster_last_name').notNullable().defaultsTo('')
    table.string('message').notNullable().defaultsTo('')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('kudos')
}