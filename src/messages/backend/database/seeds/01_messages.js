exports.seed = function (knex, Promise) {
  return knex('messages').del()
    .then(function () {
      return knex('messages').insert([
        { id: 1, poster_first_name: 'Henry', poster_last_name: 'Turner', message: 'This is a test.' },
        { id: 2, poster_first_name: 'Chris', poster_last_name: 'Peterson', message: 'This is also a test.' },
        { id: 3, first_name: 'Stephen', last_name: 'Hunter', message: 'This is a test also.' },
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('messages_id_seq', (SELECT MAX(id) FROM messages));`)
    })
}