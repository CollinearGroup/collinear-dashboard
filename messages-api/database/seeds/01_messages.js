exports.seed = function (knex, Promise) {
  return knex('messages').del()
    .then(function () {
      return knex('messages').insert([
        { id: 1, poster_name: 'Henry Turner', message: 'This is a test.', show_from: '2020-03-01', show_to: '2020-03-08' },
        { id: 2, poster_name: 'Chris Peterson', message: 'This is also a test.', show_from: '2020-03-08', show_to: '2020-03-15' },
        { id: 3, poster_name: 'Stephen Hunter', message: 'This is a test also.', show_from: '2020-03-15', show_to: '2020-03-29' },
        { id: 4, poster_name: 'Lee Rosenberg', message: 'Beware of the coronavirus, stay home!!', show_from: '2020-03-15', show_to: '2020-04-17' },
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('messages_id_seq', (SELECT MAX(id) FROM messages));`)
    })
}