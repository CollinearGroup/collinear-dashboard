FROM node:12-alpine

USER 1000
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm i

COPY ./src ./src
RUN npx tsc

CMD [ "node", "dist/app.js" ]
