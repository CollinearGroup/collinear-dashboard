# collinear-dashboard

> Displays Collinear Data and Project Statistics

Hacking? See the [CONTRIBUTING.md](/CONTRIBUTING.md) guide.

## Getting Started

### Build

```bash
$ cd ../kudos-api; ./gradlew jibDockerBuild --image=kudos-api; cd -;
$ docker-compose build
...
```

### Run

#### Database

```bash
$ docker-compose -f docker-compose.db.yml up -d 
$ ./setUpDb.sh
```

#### Application Stack

```bash
$ docker-compose up -d
```

## Contributing

See our [Confluence](https://collineargroup.atlassian.net/wiki/spaces/COL/pages/687538280/Dev+Ops)
