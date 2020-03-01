import AWS from "aws-sdk"
import fs, { ReadStream } from "fs"
AWS.config.update({ region: "west-us" })
const endpoint = process.env.S3_ENDPOINT

const mockCredentials = {
  accessKeyId: "access-key-id",
  secretAccessKey: "secret-access-key"
}
const s3client = new AWS.S3({
  credentials: mockCredentials,
  endpoint,
  s3ForcePathStyle: true
})
const bucketName = process.env.AWS_BUCKET_NAME || "default"

export const storeFile = async (name: string, filePath: string) => {
  const fileStream = fs.createReadStream(filePath)
  await save(name, fileStream)
}

export const save = async (name: string, fileStream: ReadStream) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: name
  } as AWS.S3.PutObjectRequest

  return new Promise((resolve, reject) => {
    fileStream.on("error", function(err) {
      console.log("File Error", err)
      reject()
    })

    // call S3 to retrieve upload file to specified bucket
    s3client.upload(uploadParams, function(err, data) {
      if (err) {
        console.log("Error", err)
        return reject()
      }
      console.log("Upload Success", data.Location)
      return resolve()
    })
  })
}

export const initializeStoreWithBucket = () => {
  const setupBucketsInterval = setInterval(() => {
    s3client.listBuckets((err, data) => {
      if (err) {
        console.log("Unable to validate storage service is ready, will retry.")
        return
      }
      const existingBucket = data.Buckets?.find(el => el.Name === bucketName)
      if (!existingBucket) {
        const bucketOptions = {
          Bucket: bucketName
        }
        s3client.createBucket(bucketOptions, err => {
          if (err) {
            console.log(
              "Unable to validate storage service is ready, will retry."
            )
            return
          }
          console.log("Created new bucket of", bucketName)
          clearInterval(setupBucketsInterval)
        })
        return
      }
      console.log("Found existing bucket of", bucketName)
      clearInterval(setupBucketsInterval)
    })
  }, 10000)
}
initializeStoreWithBucket()
