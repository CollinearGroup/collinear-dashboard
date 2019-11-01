exports.up = function (knex, Promise) {
  return knex.schema.createTable('games', table => {
      table.increments()
      table.integer('red_def').notNullable()
      table.integer('red_off').notNullable()
      table.integer('black_def').notNullable()
      table.integer('black_off').notNullable()
      table.integer('red_points').notNullable().defaultsTo(0)
      table.integer('black_points').notNullable().defaultsTo(0)
      table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('games')
}