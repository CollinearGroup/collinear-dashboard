FROM node:12-alpine

USER node
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY ./public ./public
COPY ./src ./src

USER node

CMD ["npm", "start"]