import fs from "fs"
import { storeFile, getRandomFile } from "./store"
import express from "express"
import {
  validateAuth,
  temporaryFileUploadsDirectory,
  PicIncomingHttpHeaders
} from "./appUtil"

export const rootPathRoute = (req: express.Request, res: express.Response) =>
  res.send("Hello File Uploader!")

export const uploadRoute = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { pic_api_key } = req.headers as PicIncomingHttpHeaders
    validateAuth(pic_api_key)
  } catch (error) {
    res.status(403).send({ message: error.message })
    return
  }
  const uploadedFileName = req.file.filename
  const uploadedFilePath = `${temporaryFileUploadsDirectory}/${uploadedFileName}`
  const name = req.file.originalname
  try {
    await storeFile(name, uploadedFilePath)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
    await removeUploadFile(uploadedFilePath)
    return
  }
  await removeUploadFile(uploadedFilePath)
  res.send({ message: "success" })
}

export const removeUploadFile = async (filePath: string) => {
  try {
    await fs.promises.unlink(filePath)
  } catch (error) {
    console.log(error)
  }
}

export const nextRandomPhotoRoute = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const file = await getRandomFile()
    file.pipe(res)
    return
  } catch (error) {
    console.log(error)
    res.status(500).send({message: 'Unable to get the next picture!'})
    return
  }
}