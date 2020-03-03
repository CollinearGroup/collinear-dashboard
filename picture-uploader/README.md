# picture-uploader

> A simple web server that handles uploads to an S3 API

## Getting Started

```sh
docker-compose up
npm i
npm run dev
```

The docker-compose will start the fully functional stack with the app and backing Mock S3 storage service (no real auth).
The local running app should by default point to the same S3 service via the locally mapped port.

## Testing

Manually for now.

See the script in `res/upload-image-script.sh`

## Deployment

When deploying, just set the `PIC_API_KEY` environment variable as you will need it in production to upload pictures.

Set the header `pic-api-key` in your request headers to authenticate.
