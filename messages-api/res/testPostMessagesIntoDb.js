const crypto = require("crypto")
const baseURL = "http://localhost"
const targetPort = 8011
const serverId = "APP"
const secretKey = "development"
const issuedKeyAt = 1557794619
const randomString = "WINTERBOOTS"

const newMessage = {
  text: "helloworld from team awesome (dan, and lee)",
  from: "the dream team"
}
// const message = JSON.stringify(newMessage)

// const hash = crypto.createHmac("sha256", secretKey).update(message)
// console.log("first", hash)
// // const digestHex = hash.digest("hex")
// // console.log("hex", digestHex)
// const digest64 = hash.digest("base64")
// console.log("base64", digest64)
// process.exit()

// function createBase64Hash(data, hashAlg = "sha256") {
//   return crypto
//     .createHash(hashAlg)
//     .update(data)
//     .digest("base64")
// }

// function createHMACBase64Hash(data, hashAlg = "sha256") {
//   return crypto
//     // .createHmac(hashAlg, Buffer.from(secretKey, "base64"))
//     .createHmac(hashAlg, secretKey)
//     .update(data)
//     .digest("base64")
// }

// function getEpochSinceIssued() {
//   const currentEpochDate = Math.floor(new Date().getTime() / 1000.0)
//   return currentEpochDate - issuedKeyAt
// }

// function createHMACAuth(domain, route, method, payload) {
//   const hostname = domain.replace("http://", "")
//   const secondsSinceIssued = getEpochSinceIssued()
//   const bodyHash = createBase64Hash(JSON.stringify(payload))
//   const nonce = `${secondsSinceIssued}:${randomString}`

//   const macString = `${nonce}\n${method}\n${route}\n${hostname}\n${targetPort}\n${bodyHash}\n\n`
//   const mac = createHMACBase64Hash(macString)
//   return `MAC id='${serverId}',nonce='${nonce}',bodyhash='${bodyHash}',mac='${mac}'`
// }

// const macAuth = createHMACAuth(baseURL, "/", "POST", newMessage)
// console.log({
//   headers: {
//     Authorization: macAuth
//   }
// })

//
//  Do the request
//

// const https = require('https')
const http = require("http")

const data = JSON.stringify(newMessage)

const options = {
  hostname: "localhost",
  port: 8011,
  path: "/api/messages",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // authentication: macAuth,
    "Content-Length": data.length
  }
}

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on("data", d => {
    process.stdout.write(d)
  })
})

req.on("error", error => {
  console.error(error)
})

req.write(data)
req.end()
