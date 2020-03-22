FROM node:12

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY ./src ./src

CMD [ "node", "src/app.js" ]
