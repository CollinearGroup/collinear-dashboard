FROM node:12-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY ./src ./src

USER node
CMD [ "node", "src/app.js" ]
