const axios = require("axios")
const FOOSBALL_URL =
  process.env.REACT_APP_FOOSBALL_URL || "http://localhost:8005"
const FOOSBALL_WS = process.env.REACT_APP_FOOSBALL_WS || "ws://localhost:8005"

let matchListener = () => {}

export async function getUsers() {
  let response = await axios.get(`${FOOSBALL_URL}/users`)
  return response.data
}

export async function getMatches() {
  let response = await axios.get(`${FOOSBALL_URL}/matches`)
  return response.data
}

export async function addMatch(payload) {
  return await axios.post(`${FOOSBALL_URL}/addMatch`, payload)
}

export async function clearMatches() {
  return await axios.get(`${FOOSBALL_URL}/clearMatches`)
}

initWebSocket(WebSocket)
function initWebSocket(WebSocket) {
  const ws = new WebSocket(FOOSBALL_WS)
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
