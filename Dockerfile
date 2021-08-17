### STAGE 1: Build ###
FROM node:14.17.3
WORKDIR '/usr/src/app'

RUN mkdir backend
COPY src ./src
COPY package.json ./
COPY angular.json ./
COPY tsconfig* ./
COPY karma.conf.js ./

RUN npm i
RUN npm i @angular/cli --no-progress --loglevel=error
RUN npm run build:app

WORKDIR '/usr/src/app/backend'
COPY backend ./
RUN npm i --production

CMD [ "node", "index" ]