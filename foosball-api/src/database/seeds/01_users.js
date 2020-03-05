exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { id: 1, first_name: 'Matt', last_name: 'Mueller', current_rating: 1000, games_played: 0 },
        { id: 2, first_name: 'Chris', last_name: 'Peterson', current_rating: 1000, games_played: 0 },
        { id: 3, first_name: 'Henry', last_name: 'Turner', current_rating: 1000, games_played: 0 },
        { id: 4, first_name: 'Tessa', last_name: 'Dvorak', current_rating: 1000, games_played: 0 }
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
    })
}