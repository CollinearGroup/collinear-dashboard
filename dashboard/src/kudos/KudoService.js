import { get, post } from "axios"

const URL = process.env.REACT_APP_KUDO_URL || "http://localhost:8080/kudo"
const username = "dashboard"

export const getAll = async () => {
  const results = await get(URL)
  const kudos = results.data._embedded.kudo
  return kudos.map(transformToClientStructure)
}

export const save = async (kudo, password) => {
  const config = {
    headers: {
      Authorization: calcAuthHeader(username, password)
    }
  }
  await post(URL, transformToServerStructure(kudo), config)
}

export const calcAuthHeader = (username, password) => {
  return "Basic " + btoa(`${username}:${password}`)
}

export const transformToClientStructure = kudo => {
  return {
    ...kudo,
    from: kudo.fromPerson
  }
}

export const transformToServerStructure = kudo => {
  return {
    message: kudo.message,
    fromPerson: kudo.from
  }
}
