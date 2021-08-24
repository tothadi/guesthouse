FROM node:14.17.3
WORKDIR '/usr/src/app'

COPY backend-express ./backend
COPY frontend ./frontend
COPY ./build.sh ./
RUN chmod +x ./build.sh
RUN ./build.sh

WORKDIR '/usr/src/app/backend'

CMD [ "npm", "start" ]