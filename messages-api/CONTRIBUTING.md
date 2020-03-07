# Contributing

You can use the script: `res/postMessage.js` script to post a message with appropriate HMAC auth as the Teams Outgoing Webhook will send it.

If you work on auth, `res/simpleServer.js` gives you a quick server that manually validates the HMAC auth. If you want the Teams Webhook to send data to this script, fire up an [`ngrok`](https://ngrok.com) tunnel.

NOTE: Double check the port and endpoint as it might vary depending on what was being tested last.

## Example Message from Teams

```js
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
```
