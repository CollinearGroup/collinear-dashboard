let hostUrl = process.env.foosballServerUrl || 'http://localhost:8005'
export async function getUsers() {
  let response = await fetch(`${hostUrl}/users`)
  return await response.json()
}