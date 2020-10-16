import { IncomingHttpHeaders } from "http"
import jwt from "jsonwebtoken"

export const temporaryFileUploadsDirectory = "file-uploads"

export const validateAuth = (token: string) => {
  jwt.verify(token, process.env.AUTH_SECRET as string, (err) => {
    if (err) {
      console.error('Error validating JWT', err);
      throw new Error("JWT validation failed")
    }
  });
}

export const validateUploadApiKey = (apiKey: string) => {
  if (process.env.NODE_ENV !== "production") {
    console.log('skipping auth since', process.env.NODE_ENV)
    return
  }
  if (!apiKey) {
    throw new Error("Missing API Key")
  }
  if (apiKey !== process.env.PIC_API_KEY) {
    throw new Error("Invalid API Key")
  }
}

export interface PicIncomingHttpHeaders extends IncomingHttpHeaders {
  ['authorization']: string,
  ['pic-api-key']: string
}
