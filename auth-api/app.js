const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const app = express()
const bcrypt = require('bcrypt')

app.use(cors())
app.use(bodyParser.json());

const port = 8020

function generateJwt() {
  const token = jwt.sign({
    user: 'dashboard'
  },
    process.env.AUTH_SECRET,
    {
      expiresIn: '7d'
    });

  return token;
}

app.post('/api', async (req, res) => {
  const password = req.body.password;

  const match = await bcrypt.compare(password, process.env.AUTH_PASSWORD);

  if (match) {
    res.json({
      jwt: generateJwt()
    });
  } else {
    res.status(401).json({});
  }
});

app.listen(port, () => console.log(`Dashboard Auth API listening on port ${port}!`))
