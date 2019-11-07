const knex = require('knex')(require('./knexfile'))

module.exports = {
  createMessage ({ title, description, event_date, msg_closing, effective_date, expiration_date }) {
    console.log(`Posting message ${title}`)
    return knex('message').insert({
      title,
      description,
      event_date,
      msg_closing,
      effective_date,
      expiration_date
    })
  },

  getMessages () {
    let currentTime = new Date();
    console.log(`Getting Active Messages`)
    return knex('message').select({
      title: 'title',
      description: 'description',
      event_date: 'event_date',
      msg_closing: 'msg_closing',
      effective_date: 'effective_date',
      expiration_date: 'expiration_date'
    }).where('effective_date', '<=', currentTime).where('expiration_date', '>=', currentTime)
  }
}
