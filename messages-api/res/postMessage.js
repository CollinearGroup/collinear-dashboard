const crypto = require("crypto")
const http = require("http")

// Setup data and various, necessary transformations
const secret = "development"
const secretBuffer = Buffer.from(secret, "base64")
const message = {
  from: "The Bossman",
  text: "helloworld from team awesome (dan, and lee)"
}
const payload = JSON.stringify(message)
const payloadBuffer = Buffer.from(payload, "utf8")

// Create HMAC hash
const hash = crypto.createHmac("sha256", secretBuffer).update(payloadBuffer)
const digest64 = hash.digest("base64")
const hmacAuth = `HMAC ${digest64}`

// Send the request
const httpRequestOptions = {
  hostname: "localhost",
  port: 8011,
  path: "/api/messages/",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: hmacAuth,
    "Content-Length": payload.length
  }
}
const req = http.request(httpRequestOptions, res => {
  res.on("data", d => {
    process.stdout.write(d)
  })
})
req.on("error", error => {
  console.error(error)
})
req.write(payload)
req.end()
