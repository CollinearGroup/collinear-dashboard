import express from "express"
import { temporaryFileUploadsDirectory } from './appUtil'
import { rootPathRoute, uploadRoute } from "./routes";
const multer = require("multer")

process.env.NODE_ENV = process.env.NODE_ENV || "production"
process.env.S3_ENDPOINT = process.env.S3_ENDPOINT || "http://localhost:4572"
const port = process.env.PORT || 3000

const upload = multer({ dest: temporaryFileUploadsDirectory })
const app = express()

app.listen(port, () => console.log(`Listening on http://localhost:${port}!`))

app.get("/", rootPathRoute)
app.post("/upload", upload.single("file"), uploadRoute)
