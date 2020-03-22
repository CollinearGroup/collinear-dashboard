FROM node:12

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm i

COPY ./src ./src
RUN npx tsc

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl http://localhost:80" ]

CMD [ "node", "dist/app.js" ]
