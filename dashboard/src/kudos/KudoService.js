import { get, post } from "axios"

const URL = process.env.REACT_APP_KUDO_URL || "http://localhost:8080/kudo"

export const getAll = async () => {
  const results = await get(URL)
  const kudos = results.data._embedded.kudo

  return kudos.map(transformToClientStructure)
}

export const save = async (kudo, password) => {
  const config = {
    headers: {
      Authorization: window.dashboardJwt
    }
  }
  await post(URL, transformToServerStructure(kudo), config)
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
