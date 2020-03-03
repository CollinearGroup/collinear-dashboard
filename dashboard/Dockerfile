FROM node:12

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY ./public ./public
COPY ./src ./src
