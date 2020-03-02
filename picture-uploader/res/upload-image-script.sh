for f in images/*; do
  echo "Uploading -> $f";
  curl -H "PIC_API_KEY:pic-api-key" -F file="@$f" localhost:3200/upload;
done