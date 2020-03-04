import AWS from "aws-sdk"
import fs, { ReadStream } from "fs"
import { Readable } from "stream"
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
const bucketOptions = {
  Bucket: bucketName
}

export const storeFile = async (name: string, filePath: string) => {
  console.log('storing file of', name, 'as', filePath)
  const fileStream = fs.createReadStream(filePath)
  await save(name, fileStream)
}

export const save = async (name: string, fileStream: ReadStream) => {
  console.log('saving file of', name)
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
        console.log("Storage Upload Error", err)
        return reject()
      }
      console.log("Storage Upload Success", data.Location)
      return resolve()
    })
  })
}

export const getRandomFile = async (): Promise<Readable> => {
  console.log('getting random file')
  const objectsInBucket = await listObjectsInBucket()
  const bucketItemsLength = objectsInBucket?.Contents?.length
  if (bucketItemsLength === undefined || bucketItemsLength === null || bucketItemsLength === 0) {
    throw new Error("There are no pictures to show.")
  }
  const randomPictureIndex = Date.now() % bucketItemsLength
  const bucketObjectKey = objectsInBucket?.Contents?.[randomPictureIndex]?.Key
  const pictureStream = getObject(bucketObjectKey)
  return pictureStream
}

export const getObject = (Key: string = ""): Readable => {
  const pts = {
    Key,
    Bucket: bucketName
  }
  return s3client.getObject(pts).createReadStream()
}

export const listObjectsInBucket = (): Promise<AWS.S3.ListObjectsOutput> => {
  return new Promise((resolve, reject) => {
    s3client.listObjects(bucketOptions, function(err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

export const initializeStoreWithBucket = () => {
  const setupBucketsInterval = setInterval(() => {
    s3client.listBuckets((err, data) => {
      if (err) {
        console.log(
          "Unable to validate storage service is ready, will retry.",
          err.message
        )
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
              "Unable to validate storage service is ready, will retry.",
              err.message
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
