FROM node:14.17.3
WORKDIR '/usr/src/app'

COPY backend ./backend
COPY frontend ./frontend
COPY ./build.sh ./
RUN chmod +x ./build.sh
RUN ./build.sh
RUN ls run
RUN ls run/client
RUN ls run/admin

CMD [ "node", "run/index" ]