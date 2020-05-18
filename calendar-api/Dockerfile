FROM node:12-alpine

USER node
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY ./*.js ./

CMD [ "node", "app.js" ]
