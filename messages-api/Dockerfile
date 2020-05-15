FROM node:12-alpine

USER 1000
WORKDIR /app

COPY package*.json ./

RUN npm i

COPY ./ ./

CMD [ "node", "app.js" ]
