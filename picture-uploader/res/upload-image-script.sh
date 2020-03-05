# URL=http://localhost:9200/upload;
URL=http://localhost/picture-uploader/upload;
# URL=http://dashboard.collineargroup.com/picture-uploader/upload;
PASS=pic-api-key
for f in images/*; do
  echo "Uploading -> $f";
  curl -H "pic-api-key:$PASS" -F file="@$f" $URL
done
