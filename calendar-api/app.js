const express = require('express')
const cors = require('cors')
const parse = require('./parse')
const app = express()

app.use(cors())

const port = 8010

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/schedule', async (req, res) => {
  try {
    let data = await parse.getFormattedDataForRoom()
    res.send(data)
  } catch(err) {
    console.error(err)
    res.status(400).send(err.message)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
