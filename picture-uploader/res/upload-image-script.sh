#!/bin/bash

URL=http://localhost:9200/upload;
# URL=http://localhost/picture-uploader/upload;
# URL=https://dashboard.collineargroup.com/picture-uploader/upload
PASS=pic-api-key
for f in images/*; do
  echo "Uploading -> $f";
  curl -k -H "pic-api-key:$PASS" -F file="@$f" $URL
done

# Delete curl -k -H "pic-api-key:pic-api-key" http://localhost:9200/deleteAllPhotos