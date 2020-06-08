FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY ./ ./

USER node
CMD [ "node", "app.js" ]
