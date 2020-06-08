const bcrypt = require('bcrypt');

const PASS = 'mypass';
const SALT_ROUNDS = 10;

bcrypt.hash(PASS, SALT_ROUNDS, (err, hash) => {

  console.log(`Generated hash: ${hash}`)

});