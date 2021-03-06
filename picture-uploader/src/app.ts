process.env.NODE_ENV = process.env.NODE_ENV || "production"
process.env.S3_ENDPOINT = process.env.S3_ENDPOINT || "http://localhost:4572"

import express from "express"
import cors from "cors"
import morgan from "morgan"
import { temporaryFileUploadsDirectory } from './appUtil'
import { rootPathRoute, uploadRoute, nextPhotoRoute, deleteAllPhotos } from "./routes";
const multer = require("multer")

const port = process.env.PORT || 80

const upload = multer({ dest: temporaryFileUploadsDirectory })
const app = express()
app.use(cors())
app.use(morgan('dev'))

app.listen(port, () => console.log(`Listening on http://localhost:${port}!`))

app.get("/", rootPathRoute)
app.post("/upload", upload.single("file"), uploadRoute)
app.get("/next", nextPhotoRoute)
app.get("/deleteAll", deleteAllPhotos)
