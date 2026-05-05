ARG PORT=5000

FROM node:18-alpine
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]
