#!/bin/bash


# Auth API
cd auth-api
docker build . -t auth-api;
docker tag auth-api registry.gitlab.com/collinear/collinear-dashboard-server-config/auth-api;
docker push registry.gitlab.com/collinear/collinear-dashboard-server-config/auth-api;
cd -;

# Dashboard
cd dashboard;
docker build . -t dashboard;
docker tag dashboard registry.gitlab.com/collinear/collinear-dashboard-server-config/dashboard;
docker push registry.gitlab.com/collinear/collinear-dashboard-server-config/dashboard;
cd -;


# Pictures API
cd picture-uploader;
docker build . -t picture-uploader;
docker tag picture-uploader registry.gitlab.com/collinear/collinear-dashboard-server-config/picture-uploader;
docker push registry.gitlab.com/collinear/collinear-dashboard-server-config/picture-uploader;
cd -;

# Calendar API
cd calendar-api;
docker build . -t calendar-api;
docker tag calendar-api registry.gitlab.com/collinear/collinear-dashboard-server-config/calendar-api;
docker push registry.gitlab.com/collinear/collinear-dashboard-server-config/calendar-api;
cd -;

# Foosball API
cd foosball-api;
docker build . -t foosball-api;
docker tag foosball-api registry.gitlab.com/collinear/collinear-dashboard-server-config/foosball-api;
docker push registry.gitlab.com/collinear/collinear-dashboard-server-config/foosball-api;
cd -;

# Message Board API
cd messages-api;
docker build . -t messages-api;
docker tag messages-api registry.gitlab.com/collinear/collinear-dashboard-server-config/messages-api;
docker push registry.gitlab.com/collinear/collinear-dashboard-server-config/messages-api;
cd -;

# Kudos
cd kudos-api;
./gradlew jibDockerBuild --image=kudos-api;
docker tag kudos-api registry.gitlab.com/collinear/collinear-dashboard-server-config/kudos-api;
docker push registry.gitlab.com/collinear/collinear-dashboard-server-config/kudos-api;
cd -;