#!/bin/bash

cd auth-api
docker build -t auth-api .
cd -

cd calendar-api
docker build -t calendar-api .
cd -

cd foosball-api
docker build -t foosball-api .
cd -

cd messages-api
docker build -t messages-api .
cd -

cd kudos-api
./gradlew jibDockerBuild --image=kudos-api
cd -

cd picture-uploader
docker build -t picture-uploader .
cd -

docker-compose build
docker-compose -f docker-compose.db.yml up -d
./setUpDb.sh
