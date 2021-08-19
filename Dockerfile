### STAGE 1: Build ###
FROM node:14.17.3
WORKDIR '/usr/src/app'

COPY backend ./backend
COPY frontend ./frontend
RUN mkdir run

WORKDIR '/usr/src/app/frontend/client'
RUN npm i
RUN npm run build:app

#WORKDIR '/usr/src/app/frontend/admin'
#RUN npm i
#RUN npm run build:app

WORKDIR '/usr/src/app/backend'
RUN npm i
RUN npm run build

WORKDIR '/usr/src/app/'
COPY ./backend/dist/ ./run
COPY ./frontend/client/dist/ ./run/client
COPY ./frontend/admin/src/index.html ./run/admin


CMD [ "node", "run/index" ]