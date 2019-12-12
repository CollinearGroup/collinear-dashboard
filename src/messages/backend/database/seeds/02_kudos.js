exports.seed = function (knex, Promise) {
  return knex('kudos').del()
    .then(function () {
      return knex('kudos').insert([
        { poster_first_name: 'Henry', poster_last_name: 'Turner', message: 'Congrats Chris on deleting master branch.' },
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('kudos_id_seq', (SELECT MAX(id) FROM kudos));`)
    })
}