const crypto = require("crypto")
const axios = require("axios")

// Setup data and various, necessary transformations
const secret = "development"
const secretBuffer = Buffer.from(secret, "base64")
const message = {
  from: "The Bossman",
  text: "helloworld from team awesome (dan, and lee)"
  // These should default to now, now + 5 days
  // show_from: "2020-03-01",
  // show_to: "2020-03-15"
}
const payload = JSON.stringify(message)
const payloadBuffer = Buffer.from(payload, "utf8")

// Create HMAC hash
const hash = crypto.createHmac("sha256", secretBuffer).update(payloadBuffer)
const digest64 = hash.digest("base64")
const hmacAuth = `HMAC ${digest64}`

// Send the request
const httpRequestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: hmacAuth
  }
}
// const URL = "http://localhost/messages"
const URL = "http://localhost:8011/api/messages"
axios
  .post(URL, message, httpRequestOptions)
  .then(res => {
    console.log(res.data)
  })
  .catch(err => {
    console.log(err)
  })
