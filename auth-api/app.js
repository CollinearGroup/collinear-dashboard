const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json());

const port = 8020

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api', async (req, res) => {
  const token = jwt.sign({
    user: 'dashboard'
  }, 'REPLACE_SECRET_HERE');

  res.json({
    jwt: token
  });
});

app.listen(port, () => console.log(`Dashboard Auth API listening on port ${port}!`))
