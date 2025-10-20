FROM nginx:1.24.0-alpine AS base

WORKDIR /var/www/html

FROM base as develop

COPY ./ops/docker/nginx/default.dev.conf /etc/nginx/conf.d/default.conf
COPY ./ops/docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./project /var/www/html/

FROM develop as production

COPY ./ops/docker/nginx/default.conf /etc/nginx/conf.d/default.conf
