FROM node:12-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY ./public ./public
COPY ./src ./src

CMD ["npm", "start"]