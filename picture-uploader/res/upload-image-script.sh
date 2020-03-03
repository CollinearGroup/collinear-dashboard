URL=http://localhost/picture-uploader/upload;
for f in images/*; do
  echo "Uploading -> $f";
  curl -H "pic-api-key:pic-api-key" -F file="@$f" $URL
done
