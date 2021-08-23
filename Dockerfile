FROM node:14.17.3
WORKDIR '/usr/src/app'

RUN apt install nano

COPY backend ./backend
COPY frontend ./frontend
COPY ./build.sh ./
RUN chmod +x ./build.sh
RUN ./build.sh

WORKDIR '/usr/src/app/backend'
RUN cp -r src/assets/admin/* dist/admin/dist/assets
RUN cp -r src/assets/client/* dist/client/dist/assets
RUN ls dist
RUN ls dist/client
RUN ls dist/admin

CMD [ "npm", "run", "start" ]