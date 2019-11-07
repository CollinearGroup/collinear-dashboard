
exports.up = function(knex) {
    return knex.schema.createTable('message', function (t) {
        t.increments('id').primary()
        t.string('title').notNullable()
        t.string('description').notNullable()
        t.string('event_date').notNullable()
        t.string('msg_closing')
        t.date('effective_date').notNullable()
        t.date('expiration_date').notNullable()
        t.timestamps(false, true)
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('message')
};
