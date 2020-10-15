FROM node:12-alpine

WORKDIR /app
RUN [ "mkdir", "file-uploads" ]
RUN [ "chown", "node", "file-uploads" ]
RUN [ "chmod", "a+rw", "file-uploads" ]

COPY package*.json ./
COPY tsconfig.json ./
RUN npm i

COPY ./src ./src
RUN npx tsc

USER node
CMD [ "node", "dist/app.js" ]
