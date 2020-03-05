FROM node:12

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY ./src ./src

CMD [ "node", "src/app.js" ]
