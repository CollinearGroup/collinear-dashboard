const express = require('express')
const bodyParser = require('body-parser')

const store = require('./store')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.post('/createMessage', (req, res) => {
  store
    .createMessage({
      title: req.body.title,
      description: req.body.description,
      event_date: req.body.event_date,
      msg_closing: req.body.msg_closing,
      effective_date: req.body.effective_date,
      expiration_date: req.body.expiration_date
    })
    .then(() => res.sendStatus(200))
})
app.get('/getMessages', (req, res) => {
  store
    .getMessages()
    .then((data) => res.send(data))
})

app.listen(7555, () => {
  console.log('Server running on http://localhost:7555')
})
