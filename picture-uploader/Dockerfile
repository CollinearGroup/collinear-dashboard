FROM node:12

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm i

COPY ./src ./src
RUN npx tsc

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl localhost:3000" ]
