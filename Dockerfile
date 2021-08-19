FROM node:14.17.3
ENV NODE_ENV=production
ENV HOST '0.0.0.0'

WORKDIR '/usr/src/app'

COPY backend ./backend
COPY frontend ./frontend/backend
COPY ./build.sh ./
RUN chmod +x ./build.sh
RUN ./build.sh
RUN ls run
RUN ls run/client
RUN ls run/admin

CMD [ "npm", "start" ]