import { IncomingHttpHeaders } from "http"

export const temporaryFileUploadsDirectory = "file-uploads"

export const validateAuth = (apiKey: string) => {
  if (process.env.NODE_ENV !== "production") {
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
  pic_api_key: string
}
