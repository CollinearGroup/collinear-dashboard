# Kudos API

> A SpringBoot Example

## Running

### Build the application

```sh
$ ./gradlew jibDockerBuild --image=kudos-api
```

### Start the services

The kudos-api will fail and begin restarting because you have to create the database.

```sh
$ docker-compose up
```

### Create the database

```sh
$ docker-compose exec mysql "mysql -p"
```

Enter the mysql password. It is `kudosapi` in development.

Then create the database.

```mysql
mysql> CREATE DATABASE dashboard;
```
