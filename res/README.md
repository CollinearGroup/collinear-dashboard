# Testing With LocalStack

[LocalStack](https://github.com/localstack/localstack)
[Dev Tutorial](https://dev.to/goodidea/how-to-fake-aws-locally-with-localstack-27me)

```sh
aws --endpoint-url=http://localhost:4572 s3 cp ../src/SocialMediaPhotos/images/dog1.jpeg s3://demo-bucket
aws --endpoint-url=http://localhost:4572 s3 ls s3://demo-bucket
```

## Troubleshooting

After running the `aws s3api --endpoint-url http://127.0.0.1:4572 put-bucket-acl --acl public-read --bucket demo-bucket` command to grant permissions, restart the service with `docker-compose`.