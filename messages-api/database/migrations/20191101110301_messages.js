exports.up = function (knex, Promise) {
  return knex.schema.createTable('messages', table => {
    table.increments()
    table.string('poster_name').notNullable().defaultsTo('')
    table.string('message').notNullable().defaultsTo('')
    table.date('show_from').notNullable()
    table.date('show_to').notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('messages')
}