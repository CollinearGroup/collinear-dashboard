exports.seed = function (knex, Promise) {
  return knex('messages').del()
    .then(function () {
      return knex('messages').insert([
        { id: 1, poster_name: 'Henry Turner', message: 'This is a test.' },
        { id: 2, poster_name: 'Chris Peterson', message: 'This is also a test.' },
        { id: 3, poster_name: 'Stephen Hunter', message: 'This is a test also.' },
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('messages_id_seq', (SELECT MAX(id) FROM messages));`)
    })
}