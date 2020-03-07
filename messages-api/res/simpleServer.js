const express = require("express")
const app = express()
const crypto = require("crypto")

const secret = `development`
const secretBuffer = Buffer.from(secret, "base64")

app.use(express.json())

app.post("/", (req, res) => {
  // Get payload buffer
  const rawBodyBuffer = Buffer.from(JSON.stringify(req.body), "utf8")
  const authHeader = req.headers.authorization
  const isValid = isValidPayload(authHeader, rawBodyBuffer)

  if (isValid) {
    return res.send({
      type: "message",
      text: "Your message is valid."
    })
  }

  return res.send({
    type: "message",
    text: "Your message is NOT valid."
  })
})

app.listen(8080, () => console.log("ready on http://localhost:8080"))

function isValidPayload(signature, payload) {
  const hash = crypto
    .createHmac("sha256", secretBuffer)
    .update(payload)
    .digest("base64")
  return signature === "HMAC " + hash
}
