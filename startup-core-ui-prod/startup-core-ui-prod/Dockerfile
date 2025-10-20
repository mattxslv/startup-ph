FROM node:16.13.0 as build

ARG ENVS=""

WORKDIR /var/www/html

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .

RUN npm run build

EXPOSE ${COMPOSE_WEBSERVER_PORT}
CMD [ "npm", "start" ]