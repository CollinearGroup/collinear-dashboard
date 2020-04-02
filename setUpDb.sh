#!/bin/bash
docker-compose -f docker-compose.db.yml \
  exec dashboard-db \
  sh -c "echo 'create database foosball;' | psql postgresql://dashboard:dashboard@dashboard-db"

docker-compose -f docker-compose.db.yml \
  exec dashboard-db \
  sh -c "echo 'create database message_board;' | psql postgresql://dashboard:dashboard@dashboard-db"

docker-compose -f docker-compose.db.yml \
  exec dashboard-db \
  sh -c "echo 'create database kudos_board;' | psql postgresql://dashboard:dashboard@dashboard-db"
