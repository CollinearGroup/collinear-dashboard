const crypto = require("crypto")
const http = require("http")

// Setup data and various, necessary transformations
const secret = "secret"
const secretBuffer = Buffer.from(secret, "base64")

const message = {
  text: "helloworld from team awesome (dan, and lee)"
}
const payload = JSON.stringify(message)
const payloadBuffer = Buffer.from(payload, "utf8")

// Create HMAC hash
const hash = crypto.createHmac("sha256", secretBuffer).update(payloadBuffer)
const digest64 = hash.digest("base64")
const hmacAuth = `HMAC ${digest64}`

const httpRequestOptions = {
  hostname: "localhost",
  port: 8080,
  path: "/",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: hmacAuth,
    "Content-Length": payload.length
  }
}

// Send the request
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
