FROM node:14.17.3
WORKDIR '/usr/src/app'

COPY backend ./backend
COPY frontend ./frontend
COPY ./build.sh ./
RUN chmod +x ./build.sh
RUN ./build.sh

WORKDIR '/usr/src/app/backend'
RUN ls dist
RUN ls dist/client
RUN ls dist/admin

CMD [ "npm", "start" ]