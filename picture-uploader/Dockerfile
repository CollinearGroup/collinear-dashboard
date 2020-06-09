FROM node:12-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm i

COPY ./src ./src
RUN npx tsc

USER node
CMD [ "node", "dist/app.js" ]
