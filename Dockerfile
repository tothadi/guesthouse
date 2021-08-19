FROM node:14.17.3
ENV NODE_ENV=production
ENV HOST '0.0.0.0'

WORKDIR '/usr/src/app'

COPY ./frontend ./frontend
COPY ./build.sh ./
RUN chmod +x ./build.sh
RUN ./build.sh
RUN ls dist
COPY ./backend ./
RUN npm i

CMD [ "npm", "start" ]