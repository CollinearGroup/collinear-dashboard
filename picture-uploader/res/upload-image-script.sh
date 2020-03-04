# URL=http://localhost:9200/upload;
URL=http://dashboard.collineargroup.com/picture-uploader/upload;
for f in images/*; do
  echo "Uploading -> $f";
  curl -H "pic-api-key:b2ho-aW1hc@msK!" -F file="@$f" $URL
done
