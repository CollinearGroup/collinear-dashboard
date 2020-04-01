import { get, post } from "axios"

const URL = "http://localhost:8080/kudo"
const username = "dashboard"

export const getAll = async () => {
  const results = await get(URL)
  const kudos = results.data._embedded.kudo
  return kudos
}

export const save = async (kudo, password) => {
  const config = {
    headers: {
      "Authorization": calcAuthHeader(username, password)
    }
  }
  await post(URL, kudo, config)
}

export const calcAuthHeader = (username, password) => {
  return "Basic " + btoa(`${username}:${password}`)
}
