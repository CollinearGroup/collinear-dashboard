const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const app = express()
const bcrypt = require('bcrypt')

app.use(cors())
app.use(bodyParser.json());

const port = 8020

const HASH = '$2b$10$Eewkf.tM.vcsNESzn0.SguO7srJD0BXs/9OP3J6x8dGt5fwqfhILu'

function generateJwt() {
  const token = jwt.sign({
    user: 'dashboard'
  }, 'REPLACE_SECRET_HERE');

  return token;
}

app.post('/api', async (req, res) => {
  const password = req.body.password;

  const match = await bcrypt.compare(password, HASH);

  if (match) {
    res.json({
      jwt: generateJwt()
    });
  } else {
    res.status(401).json({});
  }
});

app.listen(port, () => console.log(`Dashboard Auth API listening on port ${port}!`))
