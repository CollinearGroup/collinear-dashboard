// Use with ngrok to get a public url to local host.
const express = require("express")
const app = express()
const crypto = require("crypto")
// const bodyParser = require("body-parser")

const secret = `secret`
const secretBuffer = Buffer.from(secret, "base64")

app.use(express.json())

app.post("/", (req, res) => {
  // Get payload buffer
  const rawBodyBuffer = Buffer.from(JSON.stringify(req.body), "utf8")
  const authHeader = req.headers.authorization

  const isValid = isValidPayload(authHeader, rawBodyBuffer)

  console.log("isValid", isValid)
  if (isValid) {
    return res.send({
      type: "message",
      text: "I trust you!"
    })
  }

  if (!isValid) {
    return res.send({
      type: "message",
      text: "I do NOT trust you!"
    })
  }
})

app.listen(8080, () => console.log("ready"))

function isValidPayload(signature, payload) {
  var hash = crypto
    .createHmac("sha256", secretBuffer)
    .update(payload)
    .digest("base64")
  if (signature === "HMAC " + hash) {
    return true
  }
  return false
}

/*
 * Example REAL body from the Teams webhook
{
  type: 'message',
  id: '1583561422034',
  timestamp: '2020-03-07T06:10:22.5608396Z',
  localTimestamp: '2020-03-06T22:10:22.5608396-08:00',
  serviceUrl: 'https://smba.trafficmanager.net/amer/',
  channelId: 'msteams',
    from: {
    id: '29:1CAgvreiKQzjT7ppSob0MleYF9N7kJ2uYJ9rttCpkKu8VvOkdNw7_PGGhlojjgp1Ghcemerq9Z4c6wUPMTbByZQ',
    name: 'Dan Villa',
    aadObjectId: 'e5925057-4ee3-4eb2-bfd4-313ac4d5d444'
  },
  conversation: {
    isGroup: true,
    id: '19:0d26a46cfce348bba474e4356514e532@thread.skype;messageid=1583560947379',
    name: null,
    conversationType: 'channel',
    tenantId: '48b2d8b4-e0d1-42c7-9e65-8752de35e36e'
  },
  recipient: null,
  textFormat: 'plain',
  attachmentLayout: null,
  membersAdded: [],
  membersRemoved: [],
  topicName: null,
  historyDisclosed: null,
  locale: 'en-US',
  text: '<at>message</at> it helps to use the body parser....\n',
  speak: null,
  inputHint: null,
  summary: null,
  suggestedActions: null,
  attachments: [
    {
      contentType: 'text/html',
      contentUrl: null,
      content: '<div><div><span itemscope="" itemtype="http://schema.skype.com/Mention" itemid="0">message</span> it helps to use the body parser....</div>\n' +
        '</div>',
      name: null,
      thumbnailUrl: null
    }
  ],
  entities: [
    {
      type: 'clientInfo',
      locale: 'en-US',
      country: 'US',
      platform: 'Mac'
    }
  ],
  channelData: {
    teamsChannelId: '19:0d26a46cfce348bba474e4356514e532@thread.skype',
    teamsTeamId: '19:0d26a46cfce348bba474e4356514e532@thread.skype',
    channel: { id: '19:0d26a46cfce348bba474e4356514e532@thread.skype' },
    team: { id: '19:0d26a46cfce348bba474e4356514e532@thread.skype' },
    tenant: { id: '48b2d8b4-e0d1-42c7-9e65-8752de35e36e' }
  },
  action: null,
  replyToId: null,
  value: null,
  name: null,
  relatesTo: null,
  code: null
}
*/
