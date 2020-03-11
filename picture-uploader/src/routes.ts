import fs from "fs"
import { storeFile, getNextFile, deleteAll } from "./store"
import express from "express"
import {
  validateAuth,
  temporaryFileUploadsDirectory,
  PicIncomingHttpHeaders
} from "./appUtil"
import { defaultCrop } from "./crop"

export const rootPathRoute = (_req: express.Request, res: express.Response) =>
  res.send("Hello File Uploader!")

export const uploadRoute = async (
  req: express.Request,
  res: express.Response
) => {
  if (!validateAuthMiddleware(req, res)) return

  const uploadedFileName = req?.file?.filename
  const uploadedFilePath = `${temporaryFileUploadsDirectory}/${uploadedFileName}`
  const croppedFilePath = `${temporaryFileUploadsDirectory}/cropped-${uploadedFileName}`
  console.log("received:", uploadedFileName)

  await defaultCrop(uploadedFilePath, croppedFilePath)
  console.log("cropped:", uploadedFilePath)

  const name = req.file.originalname
  try {
    await storeFile(name, croppedFilePath)
    console.log("stored", croppedFilePath)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
    cleanUpAndIgnoreFailures([uploadedFilePath, croppedFilePath])
    return
  }
  cleanUpAndIgnoreFailures([uploadedFilePath, croppedFilePath])
  res.send({ message: "success" })
}

export const cleanUpAndIgnoreFailures = async (files: string[]) => {
  for (const file of files) {
    try {
      await removeUploadFile(file)
    } catch (error) {
      console.log("could not remove:", file)
      console.log(error)
    }
  }
}

export const deleteAllPhotos = async (
  req: express.Request,
  res: express.Response
) => {
  if (!validateAuthMiddleware(req, res)) return
  console.log("deleting all files")

  try {
    await deleteAll()
    res.send({ message: "success" })
  } catch (error) {
    res.status(500).send({ message: error.message })
    return
  }
}

export const validateAuthMiddleware = (
  req: express.Request,
  res: express.Response
): boolean => {
  try {
    const headers = req.headers as PicIncomingHttpHeaders
    validateAuth(headers["pic-api-key"])
    return true
  } catch (error) {
    res.status(403).send({ message: error.message })
    return false
  }
}

export const removeUploadFile = async (filePath: string) => {
  try {
    await fs.promises.unlink(filePath)
  } catch (error) {
    console.log(error)
  }
}

export const nextPhotoRoute = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const file = await getNextFile()
    file.pipe(res)
    return
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Unable to get the next picture!" })
    return
  }
}
