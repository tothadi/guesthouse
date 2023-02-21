FROM node:18-alpine
WORKDIR '/usr/src/app'

COPY backend ./backend
COPY frontend ./frontend
COPY ./build.sh ./
RUN chmod +x ./build.sh
RUN ./build.sh

WORKDIR '/usr/src/app/backend'

CMD [ "npm", "start" ]
