FROM node:14.17.3
WORKDIR '/usr/src/app'

COPY backend ./backend
COPY frontend ./frontend
COPY ./build.sh ./
RUN chmod +x ./build.sh
RUN ./build.sh

WORKDIR '/usr/src/app/backend'
RUN cp -r src/assets/admin/* dist/admin/assets
RUN cp -r src/assets/client/* dist/client/assets
RUN ls dist
RUN ls dist/client
RUN ls dist/admin

ENV NODE_ENV=production
ENV HOST '0.0.0.0'
CMD [ "npm", "start" ]