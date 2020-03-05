exports.seed = function(knex, Promise) {
  return knex('games').del()
    .then(function () {
      return knex('games').insert([
        { id: 1, red_def: 1, red_off: 4, black_def: 2, black_off: 3, red_points: 5, black_points: 4 },
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('games_id_seq', (SELECT MAX(id) FROM games));`)
    })
}