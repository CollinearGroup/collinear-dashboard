# picture-uploader

> A simple web server that handles uploads to an S3 API

NOTE: AUTH DOES NOT REALLY WORK

This is because LocalStack doesn't mimic AWS auth. So creds are required but do not get checked against anything.

## Getting Started

```sh
docker-compose up
npm i
npm run dev
```

The docker-compose will start the fully functional stack with the app and backing S3 storage service.
The local running app should by default point to the same S3 service via the locally mapped port.

## Testing

Manually for now.

Use `curl -H "PIC_API_KEY:pic-api-key" -v -F upload=@tsconfig.json localhost:3000/upload` to test the API.

## Deployment

When deploying, just set the `PIC_API_KEY` environment variable as you will need it in production to upload pictures.

Set the header `pic_api_key` in your request headers to authenticate.
