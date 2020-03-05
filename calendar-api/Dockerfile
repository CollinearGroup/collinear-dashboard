FROM node:12

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY ./*.js ./

CMD [ "node", "app.js" ]
