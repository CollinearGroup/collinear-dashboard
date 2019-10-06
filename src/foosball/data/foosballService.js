let hostUrl = process.env.foosballServerUrl || "http://localhost:8005"
let matchListener = () => {}

export async function getUsers() {
  let response = await fetch(`${hostUrl}/users`)
  return await response.json()
}

export async function getMatches() {
  let response = await fetch(`${hostUrl}/matches`)
  return await response.json()
}

export async function addMatch(payload) {
  return await postData(`${hostUrl}/addMatch`, payload)
}

// TODO: use axios (already installed)
async function postData(url = "", data = {}) {
  // Default options are marked with *
  await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
  // return await response.json(); // parses JSON response into native JavaScript objects
}

initWebSocket(WebSocket)
function initWebSocket(WebSocket) {
  const ws = new WebSocket("ws://localhost:8005/")
  ws.onmessage = onMessageHandler
}

function onMessageHandler(event) {
  matchListener(getEventData(event))
}

function getEventData(event) {
  return JSON.parse(event.data)
}

export function onMatchUpdate(listener = () => {}) {
  matchListener = listener
}
