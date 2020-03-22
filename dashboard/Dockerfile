FROM node:12

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY ./public ./public
COPY ./src ./src
